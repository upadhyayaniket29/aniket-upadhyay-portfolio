"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ModalContextType {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedBookId: string | null;
  setSelectedBookId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isLibraryPreloading: boolean;
  setIsLibraryPreloading: (loading: boolean) => void;
  openLibraryWithPreloader: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isLibraryPreloading, setIsLibraryPreloading] = useState<boolean>(false);

  const openLibraryWithPreloader = () => {
    if (activeModal === "books") return;
    setIsLibraryPreloading(true);
  };

  // Disable/enable page scrolling depending on if a modal window is open
  useEffect(() => {
    if (activeModal && activeModal !== "home" && activeModal !== "books") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  // Support closing modals with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedBookId) {
          setSelectedBookId(null);
        } else {
          setActiveModal(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBookId]);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        setActiveModal,
        selectedBookId,
        setSelectedBookId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        soundEnabled,
        setSoundEnabled,
        isLibraryPreloading,
        setIsLibraryPreloading,
        openLibraryWithPreloader,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
export default ModalProvider;
