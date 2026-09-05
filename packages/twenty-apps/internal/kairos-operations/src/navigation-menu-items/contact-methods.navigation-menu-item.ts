import { NavigationMenuItemType, defineNavigationMenuItem } from 'twenty-sdk/define';
import { NAVIGATION_FOLDER_ID, navigationId } from 'src/constants/identifiers';
import { BOOKING_CONTACT_METHODS_VIEW_ID } from 'src/views/booking-contact-methods.view';

export default defineNavigationMenuItem({
  universalIdentifier: navigationId('contactMethods'), type: NavigationMenuItemType.VIEW,
  name: 'Contact Methods', icon: 'IconAddressBook', position: 7,
  folderUniversalIdentifier: NAVIGATION_FOLDER_ID, viewUniversalIdentifier: BOOKING_CONTACT_METHODS_VIEW_ID,
});
