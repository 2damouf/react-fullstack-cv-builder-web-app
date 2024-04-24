export const slideProfileMenuAnimation = {
    initial:{ opacity: 0, scale: 0.7, y: 20 },
    animate:{ opacity: 1, scale: 1, y: 0 },
    exit:{ opacity: 0, scale: 0.7, y: 20 }
}

export const loginButtonAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 1 }
};

export const clearFilterAnimation = {
  initial:{ opacity: 0, scale: 0.6, y: 20 },
  animate:{ opacity: 1, scale: 1, y: 0 },
  exit:{ opacity: 0, scale: 0.6, y: 20 }
};

export const searchCloseButtonAnimation = {
  initial:{ opacity: 0, scale: 0.6, x: 20 },
  animate:{ opacity: 1, scale: 1, x: 0 },
  exit:{ opacity: 0, scale: 0.6, x: 20 }
};

export const templateCardButtonsInfoAnimation = {
  initial:{ opacity: 0, scale: 0.6, x: 20 },
  animate:{ opacity: 1, scale: 1, x: 0 },
  exit:{ opacity: 0, scale: 0.6, x: 20 }
};

export const showTemplateAnimation = (index) =>{
  return {
    initial:{ opacity: 0, scale: 0.85 },
    animate:{ opacity: 1, scale: 1 },
    exit:{ opacity: 0, scale: 0.85 },
    transition:{delay: index * 0.3, ease: "easeInOut"},
  }
};