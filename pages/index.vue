<script setup>

</script>

<template>
	<!-- Header Section-->
	<section class="bg-primary bg-gradient-to-t from-black/10 to-transparent pt-16 pb-8 relative">
		<div class="mx-auto text-center">
			<!-- Logo -->
			<div class="mb-8 py-4 bg-blue-50 p-20 inline-block rounded-full">
				<img src="/logo.svg" alt="Kärnten Kompass Logo" class="mx-auto h-32 w-auto" />
			</div>

			<!-- Title -->
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
				Kärnten Kompass
			</h1>
			<p class="text-xl md:text-2xl text-white/90">
				Entdecke, was Kärnten bewegt.
			</p>


		</div>

		<div
			class="absolute w-12 h-12 lg:w-20 lg:h-20 left-1/12 lg:left-1/8 top-1/10 lg:top-1/3 -translate-y-1/2 opacity-30 animate-[randomRotate_15000ms_linear_infinite]">
			<svg class="w-full h-full" width="9.54" height="11.645" version="1.1" viewBox="0 0 9.54 11.645"
				xmlns="http://www.w3.org/2000/svg">
				<g transform="matrix(.45868 -.053957 .053957 .45868 -43.659 -23.569)" stroke-linecap="square"
					stroke-width="4">
					<path
						d="m93.167 68.845 11.651-4.5188c3.016-1.0855 4.1889 0.24292 2.9682 3.0125l-4.5188 11.962c-1.0154 2.3221-0.61725 1.8046-3.6328 3.0568l-10.854 4.2087c-3.2082 1.1594-4.3703-0.2277-3.1011-3.4555l4.5188-11.386c0.86392-1.7903 0.95119-2.0956 2.9682-2.8796z"
						fill="#fff" />
					<circle cx="96.755" cy="75.446" r="3.1027" fill="#0070b8" />
				</g>
			</svg>
		</div>

		<div
			class="absolute w-16 h-16 lg:w-24 lg:h-24 right-1/12 lg:right-1/10 2xl:right-1/8 top-3/4 lg:top-2/3 -translate-y-1/2 opacity-30 animate-[randomRotate_20000ms_linear_infinite_reverse]">
			<svg class="w-full h-full" width="9.54" height="11.645" version="1.1" viewBox="0 0 9.54 11.645"
				xmlns="http://www.w3.org/2000/svg">
				<g transform="matrix(.45868 -.053957 .053957 .45868 -43.659 -23.569)" stroke-linecap="square"
					stroke-width="4">
					<path
						d="m93.167 68.845 11.651-4.5188c3.016-1.0855 4.1889 0.24292 2.9682 3.0125l-4.5188 11.962c-1.0154 2.3221-0.61725 1.8046-3.6328 3.0568l-10.854 4.2087c-3.2082 1.1594-4.3703-0.2277-3.1011-3.4555l4.5188-11.386c0.86392-1.7903 0.95119-2.0956 2.9682-2.8796z"
						fill="#fff" />
					<circle cx="96.755" cy="75.446" r="3.1027" fill="#0070b8" />
				</g>
			</svg>
		</div>
	</section>

	<section class="pt-6 bg-gradient-to-b from-black/20 via-black/10 via-5% to-transparent">
		<ImageCarousel></ImageCarousel>
	</section>


	<!-- Events Section -->
	<section class="py-16 bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Heading -->
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Veranstaltungen
				</h2>

				<!-- Divider. Source: kaernten.at to suit CI-->
				<div class="flex justify-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" width="139.583" height="6" viewBox="0 0 139.583 6">
						<path fill="var(--color-primary)"
							d="M138.315.945c-1.79-.238-5.589-.042-8.834-.426A28.985,28.985,0,0,0,126.57.293c-1.942-.033-3.877.113-5.817.1-1.8-.011-3.564-.211-5.349-.3-1.977-.1-3.965-.021-5.942-.07-3.684-.089-7.342.117-11.041.007-3.661-.109-7.237.072-10.89.074-1.888,0-11.049.2-13.133.2-4.8.007-5.954.3-9.88.32C63.4.635,61.57.564,60.477.64,59.3.723,58.372.7,57.191.741c-1.24.048-10.816.491-14.174.757s-6.745.36-10.1.6c-2.506.178-4.705.43-7.2.643-2.007.171-4.309.294-6.307.506-.832.089-1.674.175-2.518.258-2.03.2-3.7.263-5.986.551-.972.124-1.94.17-2.848.249C3.332,4.72-.126,5.035,0,5.282c.342.65,1.89.637,2.679.7,2.415.081,4.855-.145,7.277-.218,2.44-.074,4.954-.233,7.383-.361.852-.046,3.484-.4,4.241-.377a20.211,20.211,0,0,0,2.93-.247c2.177-.239,4.415-.3,6.62-.417,8.829-.476,17.636-1.114,26.512-1.254,4.013-.063,8.191-.565,12.183-.457,3.9.1,7.816-.157,11.74-.164,3.445-.008,6.907-.206,10.342-.141,1.733.034,3.418-.251,5.133-.22.879.015,1.744.12,2.623.139.812.019,2.945,0,3.348.017.8.025,8.084.251,9.513.011.811-.135,9.175.011,10.594-.083,2.485-.167,5.452-.038,7.24-.089.775.014,4.016-.25,5.793-.137a11.059,11.059,0,0,0,2.355-.2C140.284,1.558,139.6,1.115,138.315.945Z"
							transform="translate(0 0)"></path>
					</svg>
				</div>

				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Entdecken Sie die vielfältigen Veranstaltungen in Kärnten -
					von Kultur und Kunst bis hin zu einzigartigen Events.
				</p>
			</div>

			<EventPanel></EventPanel>
		</div>


	</section>

	<!-- Footer -->
	<footer class="bg-white border-t border-gray-200 py-8">
		<div class="mx-auto">
			<div class="text-center">
				<div class="mb-4">
					<img src="/logo.svg" alt="Kärnten Kompass Logo" class="h-12 w-auto mx-auto opacity-80" />
				</div>
				<a href="/impressum"
					class="text-gray-600 hover:text-primary transition-colors duration-200 text-lg font-medium">
					Impressum
				</a>
				<p class="mt-4 text-black/60 text-sm">
					fischly.dev - Pixelpoint Coding Challenge
				</p>
			</div>
		</div>
	</footer>

</template>