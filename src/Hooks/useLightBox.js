import { useContext, useEffect, useState } from "react";
import { OpenContext } from "../Context/OpenContext";

export default function useLightBox() {
  const [lightBoxToggled, setLightBoxToggled] = useState(false);
  const [lightBoxCurrentIndex, setLightBoxCurrentIndex] = useState(0);
  const { setCloseMessaging } = useContext(OpenContext);

  useEffect(() => {
    if (!lightBoxToggled) {
      setCloseMessaging(true);
    }
  }, [lightBoxToggled]);

  const toggleLightBox = () => {
    setLightBoxToggled(!lightBoxToggled);
  };

  const onEscape = (e) => {
    if (e.key === "Escape") {
      toggleLightBox();
    }
  };

  const handleLightBoxOpen = (index) => {
    setLightBoxCurrentIndex(index + 1);
    toggleLightBox();
    setCloseMessaging(false);
  };

  return {
    lightBoxToggled,
    lightBoxCurrentIndex,
    toggleLightBox,
    setLightBoxCurrentIndex,
    onEscape,
    handleLightBoxOpen,
  };
}
