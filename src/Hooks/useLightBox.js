import { useState } from "react";

export default function useLightBox() {
  const [lightBoxToggled, setLightBoxToggled] = useState(false);
  const [lightBoxCurrentIndex, setLightBoxCurrentIndex] = useState(0);

  const toggleLightBox = () => {
    setLightBoxToggled(!lightBoxToggled);
  };

  const handleLightBoxOpen = (index) => {
    setLightBoxCurrentIndex(index + 1);
    toggleLightBox();
  };

  return {
    lightBoxToggled,
    lightBoxCurrentIndex,
    toggleLightBox,
    setLightBoxCurrentIndex,
    handleLightBoxOpen,
  };
}
