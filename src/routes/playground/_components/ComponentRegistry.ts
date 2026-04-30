import TextInput from './TextInput.svelte';
import NumberInput from './NumberInput.svelte';
import SubmitButton from './SubmitButton.svelte';
import CoordinateInput from './CoordinateInput.svelte';
import SelectInput from './SelectInput.svelte';

export const registry = {
    text: TextInput,
    number: NumberInput,
    submit: SubmitButton,
    coordinate: CoordinateInput,
    select: SelectInput,
};
