export const modalStyles = (isMobile, height, width, padding, top, left) => ({
  content: {
    top,
    left,
    right: 'auto',
    bottom: 'auto',
    marginRight: isMobile ? 0 : '-50%',
    transform: isMobile ? 'none' : 'translate(-50%, -50%)',
    width,
    height,
    marginTop: isMobile ? 0 : '65px',
    borderRadius: isMobile ? 0 : '10px',
    padding,
    overflow: 'initial'
  },
  overlay: {
    zIndex: 1000,
    transition: 'right 200ms linear',
    backgroundColor: 'rgba(0, 0, 0, 0.90)',
    overflow: 'scroll'
  }
});
