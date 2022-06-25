import React, { useState } from "react";

import { PlayButton } from "../play_button";
import { PlayButtonDomain } from "../play_button_domain";

export default {
  title: "PlayButton",
  component: PlayButton,
};

export function Baseline() {
  const [playButtonDomain] = useState(() => new PlayButtonDomain());
  return <PlayButton playButtonDomain={playButtonDomain} />;
}
