import { useCallback, useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';

interface TypingPayload {
  conversationId: number;
  userId: number;
}

interface UseTypingIndicatorProps {
  socket: Socket | null;
  conversationId: number | null;
  currentUserId: number;
}

export function useTypingIndicator({
  socket,
  conversationId,
  currentUserId,
}: UseTypingIndicatorProps) {
  const [typingUsers, setTypingUsers] = useState<number[]>([]);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const isTypingRef = useRef(false);
  const lastTypingEmitRef = useRef(0);

  const receiverTimeoutsRef = useRef(
    new Map<number, ReturnType<typeof setTimeout>>(),
  );

  // Stop the current user's typing indicator.
  const stopTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    if (isTypingRef.current && socket?.connected && conversationId) {
      socket.emit('typing:stop', { conversationId });
    }

    isTypingRef.current = false;
  }, [socket, conversationId]);

  // Call whenever the current user types.
  const handleTyping = useCallback(() => {
    if (!socket?.connected || !conversationId) return;

    const now = Date.now();

    // Send immediately when typing starts, then refresh every 3 seconds.
    if (
      !isTypingRef.current ||
      now - lastTypingEmitRef.current >= 3000
    ) {
      socket.emit('typing:start', { conversationId });

      isTypingRef.current = true;
      lastTypingEmitRef.current = now;
    }

    // Stop after 1.5 seconds of inactivity.
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 1500);
  }, [socket, conversationId, stopTyping]);

  // Receive typing events from other users.
  useEffect(() => {
    if (!socket || !conversationId) return;

    const receiverTimeouts = receiverTimeoutsRef.current;

    const handleUserTyping = (payload: TypingPayload) => {
      if (
        payload.conversationId !== conversationId ||
        payload.userId === currentUserId
      ) {
        return;
      }

      setTypingUsers((prev) =>
        prev.includes(payload.userId)
          ? prev
          : [...prev, payload.userId],
      );

      // Fallback in case the stop event is lost.
      const existingTimeout = receiverTimeoutsRef.current.get(
        payload.userId,
      );

      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      const timeout = setTimeout(() => {
        setTypingUsers((prev) =>
          prev.filter((id) => id !== payload.userId),
        );

        receiverTimeoutsRef.current.delete(payload.userId);
      }, 5000);

      receiverTimeoutsRef.current.set(payload.userId, timeout);
    };

    const handleUserStoppedTyping = (payload: TypingPayload) => {
      if (payload.conversationId !== conversationId) return;

      const timeout = receiverTimeoutsRef.current.get(payload.userId);

      if (timeout) {
        clearTimeout(timeout);
        receiverTimeoutsRef.current.delete(payload.userId);
      }

      setTypingUsers((prev) =>
        prev.filter((id) => id !== payload.userId),
      );
    };

    socket.on('user:typing', handleUserTyping);
    socket.on('user:stopped-typing', handleUserStoppedTyping);

    return () => {
      socket.off('user:typing', handleUserTyping);
      socket.off('user:stopped-typing', handleUserStoppedTyping);

      receiverTimeouts.forEach(clearTimeout);
      receiverTimeouts.clear();

      setTypingUsers([]);
    };
  }, [socket, conversationId, currentUserId]);

  // Clean up when the conversation changes or the component unmounts.
  useEffect(() => {
    return () => {
      stopTyping();
    };
  }, [stopTyping]);

  return {
    typingUsers,
    handleTyping,
    stopTyping,
  };
}