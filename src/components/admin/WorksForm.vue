<template lang="pug">
#workform.editform

	h3(v-if="mode === 'create'") Creating a new work
	h3(v-else) Editing of work

	form

		.editform__imgload(
			:class="{upload: mode === 'create'}"
			:style="{backgroundImage: mode === 'edit' ? `url(/img/${editableWork.photo})` : ''}")
			label
				input.editform__imgload-fileinput(
					type="file"
					@change="appendFileAndRenderPhoto")
				.btn.btn-small.tooltip(v-if="mode === 'create'")
					svg-icon(icon-name="warning")
					| Upload
					.tooltip__text <b>The image will be replaced in the future!</b><br/>The image upload functionality is for demonstration purposes only.
				.btn.btn-small(v-else) Other photo
				.editform__imgload-container(
					:class="{filled: renderedPhoto.length}"
					:style="{'backgroundImage' : `url(${renderedPhoto})`}")

		.editform__fields

			.form-group(:class="{'error': validation.firstError('editableWork.title')}")
				label.form-label Title
				input.form-control(
					type='text'
					v-model='editableWork.title'
					value='editableWork.title'
					@change="disableSubmit = false")
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableWork.title')")

			.form-group(:class="{'error': validation.firstError('editableWork.link')}")
				label.form-label Link
				input.form-control(
					type='text'
					v-model='editableWork.link'
					value='editableWork.link'
					@change="disableSubmit = false")
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableWork.link')")

			.form-group(:class="{'error': validation.firstError('editableWork.desc')}")
				label.form-label Description
				textarea.form-control.textarea(
					v-model='editableWork.desc'
					value='editableWork.desc'
					rows='4'
					@change="disableSubmit = false")
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableWork.desc')")

			.form-group(:class="{'error': validation.firstError('editableWork.techs')}")
				label.form-label Tags (enter separated by commas)
				input.form-control(
					type='text'
					v-model='editableWork.techs'
					value='editableWork.techs'
					@change="disableSubmit = false")
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableWork.techs')")

			ul.tags-list
				li.tags-list__item(v-for="(item, idx) in tagsList" :key="idx" @click="deleteTag(item)")
					| {{ item }}
					svg-icon(icon-name="remove")

			.editform__btns
				a.btn(href="#" @click.prevent="hideForm") Cancel
				button.btn.primary-btn(
					type='submit'
					:disabled="disableSubmit"
					@click.prevent="saveWork") Save
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Validator } from 'simple-vue-validator';

export default {

	name: 'WorksForm',

	mixins: [require('simple-vue-validator').mixin],

	components: {
		SvgIcon: () => import("@/components/SvgIcon"),
		ErrorTooltip: () => import('../ErrorTooltip')
	},

	props: {
		editedWork: {
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
			renderedPhoto: "",
			editableWork: {
				title: "",
				link: "",
				desc: "",
				techs: "",
				photo: ""
			}
		}
	},

	created() {
		if (this.mode === 'create') this.clearFormFields();
		if (this.mode === 'edit') {
			this.editableWork = {...this.editedWork};
			this.editableWork.oldPhoto = this.editableWork.photo;
		}
	},

	validators: {
		'editableWork.title': (value) => {
			return Validator.value(value).required('Enter the title of the work');
		},

		'editableWork.link': (value) => {
			return Validator.value(value).required('Enter link');
		},

		'editableWork.desc': (value) => {
			return Validator.value(value).required('Enter description');
		},

		'editableWork.techs': (value) => {
			return Validator.value(value).required('Enter tags');
		}
	},

	computed: {
		tagsList() {
			return this.editableWork.techs.trim().split(",");
		}
	},

	methods: {
		...mapActions("works", ["addWork", "editWork"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		async saveWork() {

			this.$validate().then( async success => {
				if (!success) {
					this.disableSubmit = true;

					this["SHOW_TOOLTIP"]({
						type: "error",
						text: 'Validation failed!'
					});

					return;
				}

				const thisWork = {
					title: this.removeHtmlTagsAndCrop(this.editableWork.title, 60),
					link: this.removeHtmlTagsAndCrop(this.editableWork.link, 30),
					desc: this.removeHtmlTagsAndCrop(this.editableWork.desc, 400),
					techs: this.removeHtmlTagsAndCrop(this.editableWork.techs, 100),
					photo: this.editableWork.photo
				};

				if (this.mode === 'create') {  // C R E A T E
					try {
						const response = await this.addWork(thisWork);

						if (response.indexOf('can not be') !== -1) {
							this["SHOW_TOOLTIP"]({
								type: "success",
								text: response
							});
						} else {
							this["SHOW_TOOLTIP"]({
								type: "success",
								text: 'New work added!'
							});
						}

						this.hideForm();

					} catch (e) {
						this["SHOW_TOOLTIP"]({
							type: "error",
							text: 'Unable to save work!' + e
						});
					}
				} else {  // E D I T
					thisWork.id = this.editableWork.id;

					try {
						await this.editWork(thisWork);

						this["SHOW_TOOLTIP"]({
							type: "success",
							text: 'Work edited!'
						});

						this.hideForm();

					} catch (e) {
						this["SHOW_TOOLTIP"]({
							type: "error",
							text: 'Unable to save work!' + e
						});
					}
				}

			});
		},

		appendFileAndRenderPhoto(e) {
			const file = e.target.files[0];

			const reader = new FileReader();

			try {
				reader.readAsDataURL(file);
				reader.onload = () => {
					this.renderedPhoto = reader.result;

					this.editableWork.photo = this.renderedPhoto;

					if (this.mode === 'edit' && this.editableWork.photo !== this.editableWork.oldPhoto) {
						if (this.editableWork.oldPhoto === 'work-' + this.editableWork.id + '.jpg')
							this.editableWork.photo = 'work-' + this.editableWork.id + '-v.jpg';
						else
							this.editableWork.photo = 'work-' + this.editableWork.id + '.jpg';
					}
					else this.editableWork.photo = '';
				};

				this["SHOW_TOOLTIP"]({
					type: "success",
					text: 'Photo uploaded!'
				});
			} catch (error) {
				this["SHOW_TOOLTIP"]({
					type: "error",
					text: error.response.data.error
				});
			}
		},

		deleteTag(tag) {
			let tagsInput;
			tagsInput = this.editableWork.techs;

			tagsInput = tagsInput.replace(tag,'');
			tagsInput = tagsInput.replace(',,',',');
			tagsInput = tagsInput.trim();
			if (tagsInput[0] === ',') {
				tagsInput = tagsInput.slice(1);
			}
			if (tagsInput[tagsInput.length - 1] === ',') {
				tagsInput = tagsInput.slice(0,-1);
			}
			tagsInput = tagsInput.trim();
			this.editableWork.techs = tagsInput;
		},

		hideForm() {
			this.disableSubmit = false;
			this.validation.reset();
			this.$emit("hideWorkForm");
		},

		clearFormFields() {
			this.editableWork.title = "";
			this.editableWork.link = "";
			this.editableWork.desc = "";
			this.editableWork.techs = "";
			this.editableWork.photo = "";
			this.editableWork.title = "";
			this.renderedPhoto = '';
		},

		removeHtmlTagsAndCrop(string, length) {
			let rex = /(<([^>]+)>)/ig,
					clearString = string.replace(rex , "");
			return clearString.slice(0, length).trim();
		}
	}
};
</script>
