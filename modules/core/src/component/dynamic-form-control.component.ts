import {OnInit, TemplateRef} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {DynamicFormValueControlModel} from "../model/dynamic-form-value-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "../model/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../model/checkbox/dynamic-checkbox-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "../model/radio/dynamic-radio-group.model";

export abstract class DynamicFormControlComponent implements OnInit {

    contentTemplate: TemplateRef<any>;
    control: FormControl;
    controlGroup: FormGroup;
    hasFocus: boolean;
    model: DynamicFormValueControlModel<any>;
    type: string; // must be defined by sublcass

    incompatibilities: Array<string> = [];

    constructor() {
    }

    ngOnInit() {

        if (this.incompatibilities.indexOf(this.model.type) > -1) {
            throw new Error(`Control ${this.model.id} of type ${this.model.type} is not supported by ${this.type} UI package.`);
        }

        this.control = <FormControl> this.controlGroup.controls[this.model.id];
        //@exclude
        this.control.valueChanges.subscribe((value: any) => {
            console.log(this.model.id + " field changed to: ", value, typeof value, this.control.valid);
        });
        //@endexclude
    }

    get isCheckbox() {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }

    get isCheckboxGroup() {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }

    get isRadioGroup() {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
    }

    get isValid() {
        return this.control.valid;
    }

    onBlur($event) {

        this.hasFocus = false;
        //@exclude
        console.log(this.model.id + " field is blurred");
        //@endexclude
    }

    onFocus($event) {

        this.hasFocus = true;
        //@exclude
        console.log(this.model.id + " field is focused");
        //@endexclude
    }
}
