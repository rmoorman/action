/**
 * Renders a flat shadow representing where a reflection card will land.
 *
 * @flow
 */
import styled from 'react-emotion';

import appTheme from 'universal/styles/theme/appTheme';
import ui from 'universal/styles/ui';

type Props = {
  // Height of this drop shadow - should be computed from the height of the
  // reflection card being dragged.
  height: number | string
};

const ReflectionCardDropPreview = styled('div')(({height}: Props) => ({
  backgroundColor: appTheme.palette.light90g,
  borderRadius: 3,
  height,
  width: ui.retroCardWidth
}));

export default ReflectionCardDropPreview;
