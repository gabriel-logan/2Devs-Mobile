import { NavigationProp } from '@react-navigation/native';

interface MyNavigationProps {
	Drawer: undefined;
}

export type NavigationType = NavigationProp<MyNavigationProps>;

export interface NavigationPropsTypes {
	navigation: NavigationType;
}

/**
 *
 * import { NavigationProp } from '@react-navigation/native';

export interface NavigationPropsTypes {
	navigation: NavigationProp<ReactNavigation.RootParamList>;
}

 */
