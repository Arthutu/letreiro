import { SettingsModalContent } from "./content";
import { CustomModal } from "common/components/custom-modal";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const SettingsModal = ({
  open,
  setIsOpen,
  title,
}: Props): JSX.Element => {
  return (
    <CustomModal open={open} setIsOpen={setIsOpen} title={title}>
      <SettingsModalContent />
    </CustomModal>
  );
};
