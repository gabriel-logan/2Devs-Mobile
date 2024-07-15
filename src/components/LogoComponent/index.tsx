import React from "react";
import {StyleProp, ViewStyle} from "react-native";
import {useTheme} from "../ThemeContext";
import Marca from "../../../assets/marca.svg";
import MarcaLight from "../../../assets/marcalight.svg";

interface LogoComponentProps {
	style: StyleProp<ViewStyle>;
	width: number | string;
	height: number | string;
}

const LogoComponent = ({style, width, height}: LogoComponentProps) => {
	const {theme} = useTheme();
	const Logo = theme === "light" ? Marca : MarcaLight;
	return <Logo style={style} width={width} height={height} />;
};

export default LogoComponent;
