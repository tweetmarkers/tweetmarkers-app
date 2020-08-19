import { addIcons } from 'ionicons'
import {
  menuSharp,
  bookmarkSharp,
  settingsSharp,
  archiveSharp,
  arrowUndoSharp,
  mailSharp,
  mailOpenSharp,
  trashSharp,
  logOutSharp
} from 'ionicons/icons'

addIcons({
  // hack: use `menu-sharp` because `menu` as-is doesn't work!
  'ios-menu-sharp': menuSharp,
  'md-menu-sharp': menuSharp,
  'ios-bookmark': bookmarkSharp,
  'md-bookmark': bookmarkSharp,
  'ios-settings': settingsSharp,
  'md-settings': settingsSharp,
  'ios-archive': archiveSharp,
  'md-archive': archiveSharp,
  'ios-restore': arrowUndoSharp,
  'md-restore': arrowUndoSharp,
  'ios-unread': mailSharp,
  'md-unread': mailSharp,
  'ios-read': mailOpenSharp,
  'md-read': mailOpenSharp,
  'ios-remove': trashSharp,
  'md-remove': trashSharp,
  'ios-logout': logOutSharp,
  'md-logout': logOutSharp
});
