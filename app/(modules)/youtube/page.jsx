import { getMyYouTubeChannels, getSubscriptions } from "@/lib/youtube";
import { getSession } from "@/lib/auth";

export default async function YouTube() {
    const session = await getSession();

    if (!session || !session.user.googleAccessToken) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-zinc-100">
                <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
                <p>Please sign in with Google to view YouTube data.</p>
                <a href="/signin" className="mt-4 px-4 py-2 bg-black text-white rounded-md">Sign In</a>
            </div>
        );
    }

    try {
        const data = await getMyYouTubeChannels(
            session.user.googleAccessToken,
            session.user.googleRefreshToken
        );
        const subscriptions = await getSubscriptions(
            session.user.googleAccessToken,
            session.user.googleRefreshToken
        );
        return (
            <div className="p-8 bg-zinc-100 min-h-screen">
                <h1 className="text-4xl font-bold text-stone-700 mb-8">YouTube Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.items?.map((channel) => (
                        <div key={channel.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={channel.snippet.thumbnails.default.url}
                                    alt={channel.snippet.title}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h2 className="text-xl font-bold">{channel.snippet.title}</h2>
                                    <p className="text-stone-500 text-sm">{channel.snippet.customUrl}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-stone-100 pt-4">
                                <div className="text-center">
                                    <p className="text-lg font-bold">{parseInt(channel.statistics.subscriberCount).toLocaleString()}</p>
                                    <p className="text-xs text-stone-400 uppercase">Subscribers</p>
                                </div>
                                <div className="text-center border-x border-stone-100">
                                    <p className="text-lg font-bold">{parseInt(channel.statistics.videoCount).toLocaleString()}</p>
                                    <p className="text-xs text-stone-400 uppercase">Videos</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold">{parseInt(channel.statistics.viewCount).toLocaleString()}</p>
                                    <p className="text-xs text-stone-400 uppercase">Total Views</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-stone-700 mb-6">Subscriptions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {subscriptions.items?.map((sub) => (
                            <div key={sub.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex items-center gap-4">
                                <img
                                    src={sub.snippet.thumbnails.default.url}
                                    alt={sub.snippet.title}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-stone-900 truncate">{sub.snippet.title}</p>
                                    <p className="text-xs text-stone-500 truncate">Channel</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        );
    } catch (error) {
        return (
            <div className="p-8 text-red-500">
                Error fetching YouTube data: {error.message}
            </div>
        );
    }
}