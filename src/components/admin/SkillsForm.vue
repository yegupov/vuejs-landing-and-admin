<template lang="pug">
#skillform.editform

	h3(v-if="mode === 'create'") Creating a new skill
	h3(v-else) Editing of skill

	form
		.form-group(:class="{'error': validation.firstError('editableSkill.title')}")
			label.form-label Title
			input.form-control(type='text' v-model='editableSkill.title' value='editableSkill.title' @change="disableSubmit = false")
			span.form-group__error
				error-tooltip(:errorText="validation.firstError('editableSkill.title')")

		.form-group(:class="{'error': validation.firstError('editableSkill.percent')}")
			label.form-label Percent
			input.form-control(
				type="text"
				placeholder="90"
				v-model='editableSkill.percent'
				value='editableSkill.percent'
				v-on:keypress="NumbersOnly"
				@change="disableSubmit = false")
			span.form-group__error
				error-tooltip(:errorText="validation.firstError('editableSkill.percent')")

		.editform__btns
			a(href="#" @click.prevent="hideForm").btn Cancel
			button(type='submit' :disabled="disableSubmit" @click.prevent="saveSkill").btn.primary-btn Save
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Validator } from 'simple-vue-validator';

export default {

	name: 'SkillsForm',

	mixins: [require('simple-vue-validator').mixin],

	components: {
		SvgIcon: () => import("@/components/SvgIcon"),
		ErrorTooltip: () => import('../ErrorTooltip')
	},

	props: {
		editedSkill: {
			type: Object,
			default: () => ({}),
			required: true
		},

		mode: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			disableSubmit: false,
			editableSkill: {
				title: "",
				percent: ""
			}
		}
	},

	created() {
		if (this.mode === 'create') this.clearFormFields();
		if (this.mode === 'edit') {
			this.editableSkill = {...this.editedSkill};
		}
	},

	validators: {
		'editableSkill.title': (value) => {
			return Validator.value(value).required('Enter the title');
		},

		'editableSkill.percent': (value) => {
			return Validator.value(value).required('Enter the percent');
		}
	},

	methods: {
		...mapActions("skills", ["addSkill", "editSkill"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		async saveSkill() {

			this.$validate().then( async success => {
				if (!success) {
					this.disableSubmit = true;

					this["SHOW_TOOLTIP"]({
						type: "error",
						text: 'Validation failed!'
					});

					return;
				}

				const thisSkill = {
					title: this.removeHtmlTagsAndCrop(this.editableSkill.title, 60),
					percent: this.editableSkill.percent
				};

				if (this.mode === 'create') {  // C R E A T E
					try {
						const response = await this.addSkill(thisSkill);

						if (response.indexOf('can not be') !== -1) {
							this["SHOW_TOOLTIP"]({
								type: "success",
								text: response
							});
						} else {
							this["SHOW_TOOLTIP"]({
								type: "success",
								text: 'New skill added!'
							});
						}

						this.hideForm();

					} catch (e) {
						this["SHOW_TOOLTIP"]({
							type: "error",
							text: 'Unable to save skill!' + e
						});
					}
				} else {  // E D I T
					thisSkill.id = this.editableSkill.id;

					try {
						await this.editSkill(thisSkill);

						this["SHOW_TOOLTIP"]({
							type: "success",
							text: 'Skill edited!'
						});

						this.hideForm();

					} catch (e) {
						this["SHOW_TOOLTIP"]({
							type: "error",
							text: 'Unable to save skill!' + e
						});
					}
				}

			});
		},

		hideForm() {
			this.disableSubmit = false;
			this.validation.reset();
			this.$emit("hideSkillForm");
		},

		clearFormFields() {
			this.editableSkill.title = "";
			this.editableSkill.percent = "";
		},

		removeHtmlTagsAndCrop(string, length) {
			let rex = /(<([^>]+)>)/ig,
					clearString = string.replace(rex , "");
			return clearString.slice(0, length).trim();
		},

		NumbersOnly(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
	}
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

form {
	justify-content: flex-start;
	flex-wrap: wrap;

	@include netbook() {
		flex-direction: column;
	}

	.form-group:first-child {
		width: 50%;
		margin-right: 5%;

		@include netbook() {
			width: 250px;
			margin-right: 0;
		}

		@include phoneSmall() {
			width: 100%;
		}
	}

	.form-group:nth-child(2) {
		width: 20%;

		@include netbook() {
			width: 250px;
		}

		@include phoneSmall() {
			width: 100%;
		}
	}

	.editform__btns {
		width: 100%;
		margin-top: 20px;
		text-align: left;

		.btn:first-child {
			margin-left: 0;
		}
	}
}
</style>
