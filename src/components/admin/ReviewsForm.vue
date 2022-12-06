<template lang="pug">
#reviewform.editform
	h3(v-if="mode === 'create'") Creating a new review
	h3(v-else) Editing of review

	form.square-imgload

		.editform__imgload(
			:class="{upload: mode === 'create'}"
			:style="{backgroundImage: mode === 'edit' ? `url(/img/${editableReview.avatar})` : ''}")
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
			.form-group(:class="{'error': validation.firstError('editableReview.author')}")
				label.form-label Author
				input.form-control(
					type='text'
					v-model='editableReview.author'
					value='editableReview.author'
					@change="disableSubmit = false")
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableReview.author')")

			.form-group
				label.form-label Position
				input.form-control(
					type='text'
					v-model='editableReview.position'
					value='editableReview.position')

			.form-group(:class="{'error': validation.firstError('editableReview.text')}")
				label.form-label Text
				textarea.form-control.textarea(
					v-model='editableReview.text'
					value='editableReview.text'
					rows='4'
					@change="disableSubmit = false"
				)
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableReview.text')")

			.editform__btns
				a.btn(href="#" @click.prevent="hideForm") Cancel
				button.btn.primary-btn(
					type='submit'
					:disabled="disableSubmit"
					@click.prevent="saveReview") Save
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Validator } from 'simple-vue-validator';

export default {

	name: 'ReviewsForm',

	mixins: [require('simple-vue-validator').mixin],

	components: {
		SvgIcon: () => import("@/components/SvgIcon"),
		ErrorTooltip: () => import('../ErrorTooltip')
	},

	props: {
		editedReview: {
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
			editableReview: {
				author: "",
				position: "",
				text: "",
				avatar: ""
			}
		}
	},

	created() {
		if (this.mode === 'create') this.clearFormFields();
		if (this.mode === 'edit') {
			this.editableReview = {...this.editedReview};
			this.editableReview.oldPhoto = this.editableReview.avatar;
		}
	},

	validators: {
		'editableReview.author': (value) => {
			return Validator.value(value).required('Enter author');
		},

		'editableReview.text': (value) => {
			return Validator.value(value).required('Enter text');
		}
	},

	methods: {
		...mapActions("reviews", ["addReview", "editReview"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		async saveReview() {
			console.log('METOD editableReview : ', this.editableReview);

			this.$validate().then( async success => {
				if (!success) {
					this.disableSubmit = true;

					this["SHOW_TOOLTIP"]({
						type: "error",
						text: 'Validation failed!'
					});

					return;
				}

				let cropText = this.removeHtmlTagsAndCrop(this.editableReview.text, 700),
						cropTextArr = cropText.split(' '),
						newText = '';
				cropTextArr.forEach( (word) => {
					if (newText.length < 650) newText = newText + word + ' ';
				});

				const thisReview = {
					author: this.removeHtmlTagsAndCrop(this.editableReview.author, 60),
					position: this.removeHtmlTagsAndCrop(this.editableReview.position, 30),
					text: newText.trim(),
					avatar: this.editableReview.avatar
				};

				if (this.mode === 'create') {  // C R E A T E
					try {
						const response = await this.addReview(thisReview);

						if (response.indexOf('can not be') !== -1) {
							this["SHOW_TOOLTIP"]({
								type: "success",
								text: response
							});
						} else {
							this["SHOW_TOOLTIP"]({
								type: "success",
								text: 'New review added!'
							});
						}

						this.hideForm();

					} catch (e) {
						this["SHOW_TOOLTIP"]({
							type: "error",
							text: 'Unable to save review!'
						});
					}
				} else {  // E D I T
					thisReview.id = this.editableReview.id;

					try {
						await this.editReview(thisReview);

						this["SHOW_TOOLTIP"]({
							type: "success",
							text: 'Review edited!'
						});

						this.hideForm();

					} catch (e) {
						this["SHOW_TOOLTIP"]({
							type: "error",
							text: 'Unable to save review!'
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

					this.editableReview.avatar = this.renderedPhoto;

					if (this.mode === 'edit' && this.editableReview.avatar !== this.editableReview.oldPhoto) {
						if (this.editableReview.oldPhoto === 'review-' + this.editableReview.id + '.jpg')
							this.editableReview.avatar = 'review-' + this.editableReview.id + '-v.jpg';
						else
							this.editableReview.avatar = 'review-' + this.editableReview.id + '.jpg';
					}
					else this.editableReview.avatar = 'review.jpg';
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

		hideForm() {
			this.disableSubmit = false;
			this.validation.reset();
			this.$emit("hideReviewForm");
		},

		clearFormFields() {
			this.editableReview.author = "";
			this.editableReview.position = "";
			this.editableReview.text = "";
			this.editableReview.avatar = "";
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
