import { IDeal } from '../../models/deal';
import { IUserSettings } from '../../models/userSettings';

export interface IProps {
	userSettings?: IUserSettings;
}

export type AppProps = IDeal;
