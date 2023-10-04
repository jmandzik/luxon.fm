<script lang="ts">
	import '../style/app.css';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<header>
	<a href="/">
		<h1 class="neon neon-yellow logo">
			luxon<span class="neon-blue flicker">.fm</span>
		</h1>
	</a>
</header>
<main>
	<slot />
</main>
{#if $page.data?.podcasts?.length || $page.url.pathname === '/explore'}
	<footer>
		<nav>
			<ul>
				{#if $page.data?.podcasts?.length}
					<li>
						<a
							class="neon"
							class:neon-yellow={$page.url.pathname === '/'}
							class:neon-blue={$page.url.pathname !== '/'}
							href="/"
						>
							Home
						</a>
					</li>
				{/if}
				<li>
					<a
						class="neon neon-blue"
						href="/explore"
						class:neon-yellow={$page.url.pathname === '/explore'}
						class:neon-blue={$page.url.pathname !== '/explore'}
						style:--tag="Explore"
					>
						Explore
					</a>
				</li>
				{#if $page.data?.podcasts?.length}
					<li>
						<a
							class="neon neon-blue"
							href="/library"
							class:neon-yellow={$page.url.pathname === '/library'}
							class:neon-blue={$page.url.pathname !== '/library'}
						>
							Library
						</a>
					</li>
				{/if}
			</ul>
		</nav>
	</footer>
{/if}

<style>
	.logo {
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	footer {
		padding: 1rem;
		flex-shrink: 0;
	}
	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		justify-content: center;
	}

	main {
		margin-right: 1rem;
		margin-left: 1rem;
		max-width: 960px;
		flex-grow: 1;
		height: calc(100% - 121px);
		overflow: hidden;
	}

	footer ul {
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 1rem;
		/* margin-top: 1rem; */
	}
</style>
