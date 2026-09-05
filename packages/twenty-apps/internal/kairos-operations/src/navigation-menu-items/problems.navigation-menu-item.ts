import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { PROBLEMS_HUMAN_REVIEW_VIEW_ID } from 'src/views/problems-human-review.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('problems'), type: NavigationMenuItemType.VIEW,
  name: 'Problems / Human Review', icon: 'IconAlertTriangle', position: 5,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: PROBLEMS_HUMAN_REVIEW_VIEW_ID,
});
