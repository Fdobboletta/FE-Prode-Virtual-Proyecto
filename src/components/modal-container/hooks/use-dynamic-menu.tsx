import { useState, MouseEventHandler } from 'react';

type MenuAnchorRefType = {
  current: HTMLDivElement | null;
};

export type UseDynamicMenuReturnType = {
  menuOpen: boolean;
  menuAnchorRef: MenuAnchorRefType;
  onOpenMenu: MouseEventHandler;
  onCloseMenu: () => void;
};

const useDynamicMenu = (): UseDynamicMenuReturnType => {
  const [menuAnchorRef, setMenuAnchorRef] = useState<MenuAnchorRefType>({
    current: null,
  });

  const menuOpen = Boolean(menuAnchorRef.current);

  const onCloseMenu = () => setMenuAnchorRef({ current: null });

  const onOpenMenu: MouseEventHandler<HTMLDivElement> = (event) =>
    setMenuAnchorRef({ current: event.currentTarget });

  return {
    menuOpen,
    menuAnchorRef,
    onOpenMenu,
    onCloseMenu,
  };
};

export { useDynamicMenu };
