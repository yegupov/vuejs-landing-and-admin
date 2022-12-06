<template lang="pug">
.editform
	form

		.editform__imgload(style="{backgroundImage: ''}")
			svg.dashed-border(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 300 200')
				rect#strokedrect(x='0', y='0', width='100%', height='100%')
			label
				input(
					type="file"
					@change="appendFileAndRenderPhoto"
				).editform__imgload-fileinput
				.btn.btn_small.tooltip
					svg-icon(icon-name="warning")
					| Upload
					.tooltip__text <b>The image will be replaced in the future!</b><br/>The image upload functionality is for demonstration purposes only.
				.editform__imgload-container(
					:class="{filled: renderedPhoto.length}"
					:style="{'backgroundImage' : `url(${renderedPhoto})`}"
				)

		.editform__fields
			.form-group(:class="{'error': validation.firstError('editableReview.author')}")
				//- label.form-label Author
				input.form-control(type='text' placeholder="Your name" v-model='editableReview.author' value='editableReview.author' @change="disableSubmit = false")
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableReview.author')")

			.form-group
				//- label.form-label Position
				input.form-control(type='text' placeholder="Your position" v-model='editableReview.position' value='editableReview.position')

			.form-group(:class="{'error': validation.firstError('editableReview.text')}")
				//- label.form-label Text
				textarea.form-control.textarea(
					placeholder="Write your review (Up to 600 characters)"
					v-model='editableReview.text'
					value='editableReview.text'
					rows='4'
					@change="disableSubmit = false"
				)
				span.form-group__error
					error-tooltip(:errorText="validation.firstError('editableReview.text')")

			.editform__btns
				button(type='submit' :disabled="disableSubmit" @click.prevent="saveReview").btn.btn_primary Add review
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
		formVisible: Boolean,
		qtyReviews: Number
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
		this.clearFormFields();
	},

	watch: {
		formVisible() {
			this.validation.reset();
			this.disableSubmit = false;
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
		...mapActions("reviews", ["addReview"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		async saveReview() {

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

						// this.$emit('addNewReview');

						this.clearFormFields();
						this.validation.reset();
					}

				} catch (e) {
					this["SHOW_TOOLTIP"]({
						type: "error",
						text: 'Unable to save review!' + e
					});
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

					// this.editableReview.avatar = this.renderedPhoto;
					this.editableReview.avatar = `review-${this.qtyReviews + 1}.jpg`;
					// console.log('editableReview avatar : ', this.editableReview.avatar);
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

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.editform {

	form {
		display: flex;
		flex-direction: column;
	}
}

.dashed-border {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}

rect#strokedrect {
 stroke: $text-color;
 fill: transparent;
 stroke-width: 1;
 stroke-dasharray: 10;
}

.tooltip {
	position: relative;
	display: inline-block;

	.tooltip__text {
		visibility: hidden;
		width: 210px;
		background-color: $color-warning;
		// box-shadow: 0 0 20px 1px rgba(0, 0, 0, .2);
		border-radius: $border-radius;
		font-size: 0.85rem;
		// color: $text-color;
		color: #fff;
		text-align: center;
		padding: 20px 15px;
		position: absolute;
		bottom: -8px;
		left: calc(100% + 40px);
		z-index: 1;

		b {
			font-size: 1.2rem;
		}
	}

	&:hover .tooltip__text {
		visibility: visible;
	}
}
</style>
