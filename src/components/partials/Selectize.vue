<template>
	<select :multiple="multiple ? true : false">
		<slot></slot>
	</select>
</template>

<script>
	export default {
		props: ['options', 'value', 'data', 'multiple', 'disabled', 'name'],
		data: () => ({_options: {}, _data: {}}),
		methods: {
			getOptions() {
				var vm = this;
				var options = Object.assign({
					listPath: 'result',
					labelField: 'name',
					valueField: 'id',
					searchField: 'name',
					dropdownParent: 'body'
				}, this.options);
				if(options.ajax) {
					var ajax = options.ajax;
					options.render = {
						option: function(item, escape) {
							var actions = '';
							var description = '';
							if(options.actions) {
								for(var i in options.actions) {
									var action = options.actions[i];
									actions += '<a class="pull-right fa fa-' + action.icon + '" data-action="' + action.name + '">&nbsp;</a> ';
								}
							}
							var descriptionHtml = '';
							if(options.descriptionField) {
								description = humanize(item[options.descriptionField]);
								descriptionHtml = `<div style="color: gray; font-size: 90%">${description}</div>`;
							}
							return `<div> ${item[options.labelField]} ${actions} ${descriptionHtml}</div>`;
						},
						optgroup_header: function(data, escape) {
							return '<div class="optgroup-header">' + escape(data.label) + '</div>';
						},
						item: function(item, escape) {
							var descriptionHtml = '';
							if(options.descriptionField) {
								var description = humanize(item[options.descriptionField]);
								descriptionHtml = `<span style="color: gray; font-size: 80%"> ${description}</span>`;
							}
							return `<div>${item[options.labelField]}${descriptionHtml}</div>`;
						}
					};

					options.load = function(query, callback) {
						if (!query.length && !options.preload) return callback();
						if(!ajax.url) return;
						var url = ajax.url.replace('{query}', encodeURIComponent(query))
						$.get(url).done(function(res) {
							var list = eval('res.' + options.listPath);
							list = list.filter(el => {
								for(let i in vm._options.filters) {
									let filter = vm._options.filters[i];
									let value = el[filter.field];
									switch(filter.operator) {
										case 'equals': {
											if(value !== filter.value) return false;
											break;
										}
									}
								}
								return el[vm._options.valueField] && el[vm._options.labelField]
							});
							Vue.set(vm, '_data', list);
							callback(list);
							vm.selectize.setValue(vm.value, true);
						});
					};
					delete options.ajax;
				}
				return options;
			},
			initialize() {
				var options = this.getOptions();
				// Vue.set(this, '_options', options);
				this._options = options;
				$(this.$el).selectize(options)

				this.selectize = this.$el.selectize;
				if(this._data) this.selectize.addOption(this._data);
				if(this.value) this.selectize.setValue(this.value, true);
				if(this.disabled) this.selectize.disable();
			},
			reInitialize() {
				this.selectize.destroy();
				this.initialize();
			},
			actionHandler(event) {
				// var action = $(event.target).data('action');
				// var value = $(event.target).parent().data('value');
				// vBus.$emit(action, value);
			}
		},
		mounted() {
			var vm = this;
			this.initialize();
			$(this.$el).on('change', function () {
				vm.$emit('input', $(this).val());
				if($(this).val()) {
					if(vm.multiple) {
						vm.$emit('data', $(this).val().map(el => vm._data.find(item => item[vm.valueField] === el)));
					} else {
						vm.$emit('data', vm._data.find(item => item[vm.valueField] === $(this).val()));
					}
				}
			});
			$(this.selectize.$dropdown).on('mousedown', '[data-action]', this.actionHandler);
			// vBus.$on(name + ':updated', item => {
			// 	this.selectize.removeOption(item.id);
			// });

			this.$watch('data', data => {
				if(data) {
					if(!data) return;
					if(!Array.isArray(data) && data) data = [data];
					Vue.set(this, '_data', data);
					this.selectize.addOption(this._data);
					this.selectize.setValue(this.value, true);
				}
			}, {immediate: true});
		},

		watch: {
			disabled(disabled) {
				if(disabled) this.selectize.disable();
				else this.selectize.enable();
			},
			value(value) {
				this.selectize.setValue(value, true);
			},
			options: {
				deep: true,
				handler: function(options) {
					this.reInitialize();
				}
			}
		},
		beforeDestroy() {
			this.selectize.destroy();
		},
		computed: {
			labelField() {
				return this._options.labelField || 'name';
			},
			valueField() {
				return this._options.valueField || 'id';
			}
		}
	}
</script>
