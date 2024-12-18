import {
  IconArchive,
  IconCheck,
  IconFileExport,
  IconFlag2,
} from '@tabler/icons-react';
import { convertTimestamp, getFallbackProfile } from '@utility/utils.js';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import DrawerDropDown from '@components/chat/DrawerDropDown.jsx';
import { chatContext } from '@/hooks/customHooks.jsx';
import { useChatStore } from '@/store/store.js';

const items = [
  { icon: IconCheck, name: 'Resolve' },
  { icon: IconFlag2, name: 'Follow Up' },
  { icon: IconArchive, name: 'Archive' },
  { icon: IconFileExport, name: 'Export to CSV' },
];

export default function ChatTopBar({ selectedUser, messages }) {
  const { pageProfile } = chatContext();
  const updateResolved = useChatStore((state) => state.updateResolved);
  const updateFollowUp = useChatStore((state) => state.updateFollowUp);
  const updateArchived = useChatStore((state) => state.updateArchived);
  const onClickHandler = (index) => {
    const user = structuredClone(selectedUser);
    delete user.messages;
    switch (index) {
      case 0: {
        updateResolved(user);
        break;
      }
      case 1: {
        updateFollowUp(user);
        break;
      }

      case 2: {
        updateArchived(user);
        break;
      }

      case 3: {
        const csvConfig = mkConfig({
          fieldSeparator: ',',
          decimalSeparator: '.',
          useKeysAsHeaders: true,
          filename: selectedUser.name,
        });
        const csv = generateCsv(csvConfig)(
          messages.map(function (el) {
            return {
              Name: el.name,
              Message: el.message,
              Timestamp: convertTimestamp(el.timestamp),
            };
          }),
        );
        download(csvConfig)(csv);
      }
    }
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border border-b border-t-0 border-solid border-light-grey p-4">
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-full bg-light-grey"
          src={
            selectedUser.avatar ? selectedUser.avatar : getFallbackProfile('G')
          }
          alt="Rounded avatar"
        />
        {/*<IconBrandMeta />*/}
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">
            Facebook Messenger from {pageProfile.name}
          </span>
        </div>
      </div>

      <div>
        <DrawerDropDown onClick={onClickHandler} items={items} />
      </div>
    </div>
  );
}
