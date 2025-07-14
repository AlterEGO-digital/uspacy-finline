import { useDispatch } from 'react-redux';

import { setIntegrationToken } from '../helpers/db';
import { useAppSelector } from '../store';
import { setIntegrationToken as setIntegrationTokenAction } from '../store/reducers/app/actions';
import { selectIntegrationToken } from '../store/reducers/app/selectors';

export const useIntegrationToken = () => {
	const token = useAppSelector(selectIntegrationToken);
	const dispatch = useDispatch();

	const setToken = (t: string) => {
		dispatch(setIntegrationTokenAction(t));
		setIntegrationToken(t);
	};

	return {
		token,
		setToken,
	};
};
