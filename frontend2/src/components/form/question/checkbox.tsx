import {Checkbox, CheckboxGroup} from "@heroui/react";
const CheckboxInput = () => {
    return (
        <CheckboxGroup defaultValue={["buenos-aires", "london"]} label="Select cities">
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
    );
};

export default CheckboxInput;