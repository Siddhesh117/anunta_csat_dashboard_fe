import FixMeLater from "../shared/types/fixMeLater.type";

type AuxiliaryProps = {
  children: React.ReactNode | FixMeLater;
};

const Auxiliary = (props: AuxiliaryProps) => props.children;

export default Auxiliary;
