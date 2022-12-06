<template lang="pug">
include ../../helpers/mixins.pug

.modal-backdrop(role='dialog' :class="{'modal-visible': visible, 'modal-invisible': !visible}")
	.modal-overlay(@click='close')
	.modal.modal_feedback
		button.btn-close(type='button' @click='close' aria-label='Close modal') ×

		.modal_feedback__header
			h2(ref='modalCaption')
				+splitIntoLines(['Feedback form'])
			p Submit a request or ask a question!

		.editform
			form

				.modal__slides(ref='modalSlides')
					transition-group(
						tag="div"
						name='slide'
						mode='out-in'
						enter-class='slide-in'
						leave-class='slide-out'
						enter-active-class='animate slide-in-active'
						leave-active-class='animate slide-out-active')

						.editform__fields(v-show="activeSlide === 1" key="1")
							h3(ref='modalFirstCaption')
								+splitIntoLines(['Choose a theme'])
							label(:class="{'animated showFromBottom delay-05s': visible}")
								.btn.btn_imitation(:class="{active: user.theme === 'HTML layout'}")
									| HTML layout
									input(type='radio' v-model='user.theme' value='HTML layout')
							label(:class="{'animated showFromBottom delay-05s': visible}")
								.btn.btn_imitation(:class="{active: user.theme === 'Site Creation (MODx)'}")
									| Site Creation (MODx)
									input(type='radio' v-model='user.theme' value='Site Creation (MODx)')
							label(:class="{'animated showFromBottom delay-1s': visible}")
								.btn.btn_imitation(:class="{active: user.theme === 'Online store Creation (PrestaShop)'}")
									| Online store Creation (PrestaShop)
									input(type='radio' v-model='user.theme' value='Online store Creation (PrestaShop)')
							label(:class="{'animated showFromBottom delay-1s': visible}")
								.btn.btn_imitation(:class="{active: user.theme === 'Widget development'}")
									| Widget development
									input(type='radio' v-model='user.theme' value='Widget development')
							label(:class="{'animated showFromBottom delay-15s': visible}")
								.btn.btn_imitation(:class="{active: user.theme === 'Creation designs'}")
									| Creation designs
									input(type='radio' v-model='user.theme' value='Creation designs')
							label(:class="{'animated showFromBottom delay-15s': visible}")
								.btn.btn_imitation(:class="{active: user.theme === 'Site maintenance'}")
									| Site maintenance
									input(type='radio' v-model='user.theme' value='Site maintenance')

						.editform__fields(v-show="activeSlide === 2" key="2")
							h3
								+splitIntoLines(['Enter your details'])
							.form-group(:class="{'focused': checkValueName, 'error': validation.firstError('user.name'), 'animated showFromBottom delay-05s': activeSlide === 2}")
								label.form-label(for='contactname') Your name *
								input#contactname.form-control(
									type='text'
									v-model='user.name'
									@change="disableSubmit = false"
									@focus="moveLabel('focus', $event)"
									@blur="moveLabel('blur', $event)")
								span.form-group__error
									error-tooltip(:errorText="validation.firstError('user.name')")

							.form-group(:class='{"focused": checkValueEmail, "error": validation.firstError("user.email"), "animated showFromBottom delay-1s": activeSlide === 2}')
								label.form-label(for='contactemail') Email *
								input#contactemail.form-control(
									type='email'
									v-model="user.email"
									@change="disableSubmit = false"
									@focus="moveLabel('focus', $event)"
									@blur="moveLabel('blur', $event)")
								.form-group__error
									error-tooltip( :errorText="validation.firstError('user.email')" )

						.editform__fields(v-show="activeSlide === 3" key="3")
							h3
								+splitIntoLines(['Write your message'])
							.form-group(:class="{'error': validation.firstError('user.text')}")
								//- label.form-label Text
								textarea.form-control.textarea(
									v-model='user.text'
									rows='10'
									@change="disableSubmit = false"
								)
								span.form-group__error
									error-tooltip(:errorText="validation.firstError('user.text')")

						.editform__fields(v-show="activeSlide === 4" key="4")
							h3
								+splitIntoLines(['Send your message'])
							input#contactcheck(type="checkbox" v-model="user.agreeCheckbox")
							span I agree to the processing of personal data
							input.invisible(type="text" v-model="user.antispam")

							.editform__btns
								button.btn.btn_primary(
									type='submit'
									:disabled="disableSubmit || !user.agreeCheckbox"
									:class="{'animated showFromBottom': activeSlide === 4}"
									@click.prevent="sendMessage") Send

				.editform__nav
					span.btn.editform__navbtn(
						@click='move(-1)'
						v-if="activeSlide !== 1") Back
					span.btn.editform__navbtn(
						@click='move(1)'
						v-if="activeSlide !== 4"
						:disabled="user.theme === null || activeSlide === 2 && !user.name.length || validation.firstError('user.name') || activeSlide === 2 && !user.email.length || validation.firstError('user.email') || activeSlide === 3 && !user.text.length")
						| Next
</template>

<script>
import { Validator } from 'simple-vue-validator';
import { mapMutations } from "vuex";

export default {
	name: 'FooterModalFeedback',

	mixins: [require('simple-vue-validator').mixin],

	props: {
		visible: Boolean
	},

	components: {
		ErrorTooltip: () => import('../ErrorTooltip')
		// FooterForm: () => import('@/components/front/FooterForm')
	},

	data() {
		return {
			activeSlide: 1,
			disableSubmit: false,
			user: {
				theme: null,
				name: "",
				email: "",
				text: "",
				agreeCheckbox: false,
				antispam: ""
			},
			fieldCaptions: null,
			checkValueEmail: false,
			checkValueName: false,
			// actionGood: false
		}
	},

	created() {
		this.clearFormFields();
	},

	mounted() {
		this.fieldCaptions = this.$refs['modalSlides'].querySelectorAll('h3');
	},

	validators: {
		'user.name': (value) => {
			return Validator.value(value).required('Enter name');
		},

		'user.email': (value) => {
			return Validator.value(value)
				.required('Enter Email')
				.email('Email entered incorrectly!')
		},

		'user.text': (value) => {
			return Validator.value(value).required('Enter message');
		}
	},

	watch: {
		visible() {
			if (this.visible) {
				// this.$refs['modalCaption'].classList.add('textblind');
				this.$refs['modalCaption'].classList.remove('textblind');
				this.$refs['modalFirstCaption'].classList.remove('textblind');

				setTimeout( () => {
					this.$refs['modalCaption'].classList.add('textblind');
				}, 80);

				setTimeout( () => {
					this.$refs['modalFirstCaption'].classList.add('textblind');
				}, 300);

				this.validation.reset();
				this.disableSubmit = false;
			}
		},

		activeSlide() {
			if (this.activeSlide === 1) {
				this.$refs['modalCaption'].classList.add('textblind');
				setTimeout( () => {
					this.$refs['modalFirstCaption'].classList.add('textblind');
				}, 50);
			} else {
				this.fieldCaptions.forEach( (caption, index) => {
					caption.classList.remove('textblind');
					if (this.activeSlide === index + 1) {
						setTimeout( () => {
							caption.classList.add('textblind');
						}, 50);
					}
				});
			}
		},
	},

	methods: {
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		close() {
			this.activeSlide = 1;
			this.clearFormFields();
			this.$emit('close');
			// this.$refs['modalCaption'].classList.remove('textblind');
		},

		move(amount) {
			let newActive;
			const newIndex = this.activeSlide + amount;
			if (newIndex > 4) newActive = 1;
			if (newIndex === 0) newActive = 4;
			this.activeSlide = newActive || newIndex;
		},

		clearFormFields() {
			this.user.name = "";
			this.user.email = "";
			this.user.text = "";
			this.disableSubmit = false;
			this.user.theme = null;
			this.user.agreeCheckbox = false;
		},

		removeHtmlTagsAndCrop(string, length) {
			let rex = /(<([^>]+)>)/ig,
					clearString = string.replace(rex , "");
			return clearString.slice(0, length).trim();
		},

		moveLabel: function (typeEvent, event) {
			let target = event.target

			if (typeEvent == 'focus' && !target.value.trim().length) { // zero-length string AFTER a trim
				target.id == 'contactemail' ? this.checkValueEmail = true : this.checkValueName = true
			}
			if (typeEvent == 'blur' && !target.value.trim().length) {
				target.id == 'contactemail' ? this.checkValueEmail = false : this.checkValueName = false
			}
		},

		async sendMessage() {

			if ((await this.$validate()) === false) return;
			this.disableSubmit = true;

			if (this.user.antispam.length) {
				// console.log('This is bot! :-))))');

				this["SHOW_TOOLTIP"]({
					type: "success",
					text: "Message sent!"
				});
			} else {

				try {
					const userData = {
						theme: this.user.theme,
						name: this.removeHtmlTagsAndCrop(this.user.name, 100),
						email: this.removeHtmlTagsAndCrop(this.user.email, 120),
						text: this.removeHtmlTagsAndCrop(this.user.text, 1500)
					}
					console.log('Submit form! User : ', userData);

					let response = await fetch('https://make-website.ru/vuelanding/mail.php', {
						method: 'post',
						headers: { 'Content-Type': 'application/json;charset=utf-8' },
						body: JSON.stringify(userData)
					});

					let result = await response.json();

					console.log('Message : ', result.message);

					this["SHOW_TOOLTIP"]({
						type: "success",
						text: result.message // "Message sent!"
					});

					this.validation.reset();
					this.clearFormFields();
					this.activeSlide = 1;

				} catch (e) {
					this["SHOW_TOOLTIP"]({
						type: "error",
						text: "Message cannot be sent!"
					});
				} finally {
					this.disableSubmit = false;
				}
			}
		}
	}
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.modal.modal_feedback {

	.modal_feedback__header {
		// margin: 30px 19% 40px 10%;
		margin: 0 10% 0 0;

		@include phone() {
			h2 {
				font-size: 2.5rem;
			}
		}

		p {
			margin: 10px 0 0;
		}
	}

	.editform__fields {
		position: absolute;

		@include phone() {
			padding-bottom: 30px;
		}

		h3 {
			opacity: 0;
			margin: 0;

			@include phone() {
				margin-top: 15px;
				font-size: 1.6rem;
			}
		}

		label {
			display: block;

			.btn_imitation {
				margin-bottom: 10px;
			}
		}
	}

	.editform__nav {
		position: absolute;
		top: 172px;
		right: 27px;

		@include phone() {
			top: 180px;
			right: auto;
			left: 6%;
		}
	}

	.editform__btns {
		text-align: left;

		.btn {
			margin: 30px 0 0;
		}
	}
}

#contactcheck {
	vertical-align: middle;

	& + span {
		margin: 0 0 0 8px;
		vertical-align: middle;

		@include phone() {
			color: $text-color;
		}
	}
}
</style>
