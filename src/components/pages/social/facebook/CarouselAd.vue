<template>
	<div class="panel">
		<div class="panel-heading">
			<h4 class="panel-title">Cards</h4>
		</div>
		<div class="panel-body" id="cards">
			<ul class="nav nav-tabs mb-15">
				<li v-for="card,idx in cards"><a :href="'#card-' + idx" data-toggle="tab">{{idx + 1}}</a></li>
				<li><a @click="addItem()"><span class="glyphicon glyphicon-plus"></span></a></li>
			</ul>
			<div class="tab-content p-15">
				<div v-for="card, idx in cards" :id="'card-' + idx" class="tab-pane">
					<fb-card-editor :value="card" @input="data=>updateData(idx, data)" :index="idx"></fb-card-editor>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props: ['value'],
		data: () => ({
			item: {
				object_story_spec: {
					link_data: {
						call_to_action: {
							type: "LEARN_MORE"
						},
						link: null,
						message: null,
						child_attachments: [],
						multi_share_optimized: true,
						multi_share_end_card: true
					},
					page_id: null,
					instagram_actor_id: null
				},
				object_type: "SHARE",
				page: {}
			},
			options: {
				uploads: [],
				fbApi,
				fbAccount: vApp.options.fbAccount
			},
			details: {
				fb_pages: [],
				call_to_action: [{"id":"OPEN_LINK","name":"Open link"},{"id":"LIKE_PAGE","name":"Like page"},{"id":"SHOP_NOW","name":"Shop now"},{"id":"PLAY_GAME","name":"Play game"},{"id":"INSTALL_APP","name":"Install app"},{"id":"USE_APP","name":"Use app"},{"id":"INSTALL_MOBILE_APP","name":"Install mobile app"},{"id":"USE_MOBILE_APP","name":"Use mobile app"},{"id":"BOOK_TRAVEL","name":"Book travel"},{"id":"LISTEN_MUSIC","name":"Listen music"},{"id":"LEARN_MORE","name":"Learn more"},{"id":"SIGN_UP","name":"Sign up"},{"id":"DOWNLOAD","name":"Download"},{"id":"WATCH_MORE","name":"Watch more"},{"id":"NO_BUTTON","name":"No button"},{"id":"CALL_NOW","name":"Call now"},{"id":"APPLY_NOW","name":"Apply now"},{"id":"BUY_NOW","name":"Buy now"},{"id":"GET_OFFER","name":"Get offer"},{"id":"GET_OFFER_VIEW","name":"Get offer view"},{"id":"GET_DIRECTIONS","name":"Get directions"},{"id":"MESSAGE_PAGE","name":"Message page"},{"id":"MESSAGE_USER","name":"Message user"},{"id":"SUBSCRIBE","name":"Subscribe"},{"id":"SELL_NOW","name":"Sell now"},{"id":"DONATE_NOW","name":"Donate now"},{"id":"GET_QUOTE","name":"Get quote"},{"id":"CONTACT_US","name":"Contact us"},{"id":"RECORD_NOW","name":"Record now"},{"id":"VOTE_NOW","name":"Vote now"},{"id":"REGISTER_NOW","name":"Register now"},{"id":"REQUEST_TIME","name":"Request time"},{"id":"SEE_MENU","name":"See menu"},{"id":"EMAIL_NOW","name":"Email now"},{"id":"OPEN_MOVIES","name":"Open movies"}]
			}
		}),
		methods: {
			addItem() {
				this.cards.push(this.newCard());
			},
			newCard: () => ({
				call_to_action: {
					type: "LEARN_MORE"
				},
				link: null,
				description: null,
				name: null,
				picture: null,
				upload: {type: null}
			}),
			updateData(idx, data) {
			
				Vue.set(this.cards, idx, Object.assign({}, this.cards[idx], data) );
			},
			updateList(list, value, key='id') {
				if(!value) return;
				if(!Array.isArray(value)) value = [value];
				value.forEach(item => {
					if(!list.find(el => el[key] == item[key])) list.push(item);
				});
			},
		},
		mounted() {
			window.get.fbc = this;
			Vue.set(this, 'item', this.value);
			
			if(this.cards.length == 0) this.cards.push(this.newCard());

			Vue.nextTick(() => {
				$('#cards ul.nav li:first, #cards .tab-pane:first').addClass('active');
			});
		},
		computed: {
			cards() {
				return this.item.object_story_spec.link_data.child_attachments;
			}
		},
		watch: {
			item: {
				deep: true,
				handler: function(item) {
					this.$emit('input', item);
				}
			}
		}
	}
</script>