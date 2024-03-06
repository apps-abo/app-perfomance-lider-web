export * from "notistack"
import { CustomContentProps, SnackbarMessage } from "notistack"

declare module 'notistack' {
	interface VariantOverrides {
		warning: false;
		myCustomVariant: true;
		error: {
			errosValidacao?: string[]
			title?: string
		};
		success: {
			title?: string
		}
	}

	type CustomContentSnackbarProps = CustomContentProps & {
		title?: string,
		message: SnackbarMessage & string[]
	}
}
