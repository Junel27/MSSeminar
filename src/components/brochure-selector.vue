<template>
	<div class="video-container">
		<!-- close btn -->
		<v-icon
			style="border-radius: 50%;padding: 2px;position: absolute;top: 20px;"
			class="ml-auto"
			:style="{
				border: brochureSrc ? $vuetify.breakpoint.smAndDown ? '2px solid rgb(0 0 0)':'2px solid rgb(255 255 255)': '2px solid rgb(255 255 255)', 
				color: brochureSrc ? $vuetify.breakpoint.smAndDown ? 'rgb(0 0 0)':'rgb(255 255 255)':'rgb(255 255 255)',
				right: brochureSrc ? $vuetify.breakpoint.smAndDown ? '70px':'20px':'20px'
			}"
			@click="closeBrochure">
			mdi-close
		</v-icon>
		<!-- back btn (brochure viewed) -->
		<v-icon
			v-show="brochureSrc"
			style="border-radius: 50%;padding: 2px;position: absolute;left: 20px;top: 20px;"
			:style="{
				border: $vuetify.breakpoint.smAndDown ? '2px solid rgb(0 0 0)':'2px solid rgb(255 255 255)', 
				color: $vuetify.breakpoint.smAndDown ? 'rgb(0 0 0)':'rgb(255 255 255)'
			}"
			class="ml-auto"
			@click="viewBrochureSelection">
			mdi-arrow-left
		</v-icon>
		<div v-if="brochureSrc" class="video-list">
			<iframe
				width="800px"
				height="100%"
				frameborder="0"
				:src="brochureSrc"></iframe>
		</div>
		<div v-else class="video-list">
			<v-hover
				v-for="(brochure, index) in brochures"
				:key="index"
				v-slot="{ hover }"
			>
				<div class="image-cont">
					<v-card
						class="py-10 card-img"
					>
						<v-img
							class="mx-auto"
							style="border: 1px solid"
							height="87%"
							width="80%"
							contain
							alt="brochure thumbnail"
							:src="brochure.thumbnail"
						></v-img>
						<span class="d-block text-h4 text-center" v-html="brochure.name"></span>
					</v-card>
					<v-overlay
						:value="hover"
						absolute>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
							<v-btn
								large
								color="white"
								class="mx-1"
								v-bind="attrs"
								v-on="on"
								@click="viewBrochure(brochure.src)">
								<v-icon color="black">mdi-eye</v-icon>
							</v-btn>
							</template>
							<span>View</span>
						</v-tooltip>

						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
							<v-btn
								large
								color="white"
								v-bind="attrs"
								v-on="on"
								class="mx-1">
								<a
									class="black--text"
									style="text-decoration:none"
									:href="downloadSrc(brochure.src)">
									<v-icon>mdi-download</v-icon>
								</a>
							</v-btn>
							</template>
							<span>Download</span>
						</v-tooltip>
					</v-overlay>
				</div>
			</v-hover>
		</div>
	</div>
</template>

<script>
  /* eslint-disable */
  export default {
    props: {
		brochures: {
			type: [Array, Object]
		}
	},

	data() {
		return {
			brochureSrc: null
		}
	},

	methods: {
		viewBrochureSelection() {
			this.brochureSrc = null
		},
		viewBrochure(googleId) {
			console.log(googleId)
			this. brochureSrc = `https://drive.google.com/file/d/${googleId}/preview`
		},
		downloadSrc(googleId) {
			console.log(googleId)
			return `https://drive.google.com/u/0/uc?id=${googleId}&export=download` 
		},
		closeBrochure() {
			this.$emit('close', true)
			this.brochureSrc = null
		},
	}
  }
</script>

<style lang="scss" scoped>

.video-container {
    position: relative;
    background-color: rgba($color: #000000, $alpha: .5);
    height: 100%;

    .video-list {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .img-thumb {
            margin: 2%;
            width: 30%;
            max-width: 640px;
            box-shadow: 0 0 10px #000;
            position: relative;
        }

        .image-cont {
            margin: 20px;
            box-shadow: 0 0 10px #000;
            background: #000;
            position: relative;

			.card-img {
				width: 400px;
				height: 600px;
			}
        }
    }
}


@media screen and (max-width: 869px) {
	.video-container {
		.video-list {
			.image-cont {
				.card-img {
					width: 200px;
					height: 341px;

					.text-h4 {
						font-size: 20px !important;
						line-height: 1;
    					margin-top: 10px;
					}
				}
			}
		}
	}

}
</style>