import { FormattedMessage, injectIntl } from "react-intl";
import type FixMeLater from "../shared/types/fixMeLater.type";

type InjectMassageProps = FixMeLater;

const InjectMassage = (props: InjectMassageProps) => <FormattedMessage {...props} />;

export default injectIntl(InjectMassage);
