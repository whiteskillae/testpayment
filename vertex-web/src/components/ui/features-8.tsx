import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, Zap, Code, Database, Globe } from 'lucide-react'

export function Features() {
    return (
        <section className="bg-transparent py-16 md:py-32">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-3">
                        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 bg-neutral-900/50 border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                            <CardContent className="relative m-auto size-fit pt-6">
                                <div className="relative flex h-24 w-56 items-center">
                                    <Zap className="mx-auto text-indigo-500 size-16" />
                                    <span className="mx-auto block w-fit text-5xl font-semibold text-white ml-2">99%</span>
                                </div>
                                <h2 className="mt-6 text-center text-3xl font-semibold text-white">Uptime</h2>
                            </CardContent>
                        </Card>
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900/50 border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                            <CardContent className="pt-6">
                                <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-white/10 dark:before:border-white/5">
                                    <Shield className="m-auto text-rose-500 size-16" />
                                </div>
                                <div className="relative z-10 mt-6 space-y-2 text-center">
                                    <h2 className="text-lg font-medium transition text-white">Secure by default</h2>
                                    <p className="text-neutral-400">Enterprise-grade security protocols protecting every layer of your application.</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900/50 border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                            <CardContent className="pt-6">
                                <div className="pt-6 lg:px-6">
                                    <div className="flex gap-4 justify-center">
                                        <Code className="text-blue-500 size-12" />
                                        <Database className="text-emerald-500 size-12" />
                                        <Globe className="text-amber-500 size-12" />
                                    </div>
                                </div>
                                <div className="relative z-10 mt-14 space-y-2 text-center">
                                    <h2 className="text-lg font-medium transition text-white">Modern Stack</h2>
                                    <p className="text-neutral-400">Next.js, Node.js, and Cloud-native architectures for maximum scalability.</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900/50 border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                            <CardContent className="grid pt-6 sm:grid-cols-2">
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-white/10">
                                        <Zap className="m-auto size-5 text-yellow-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-medium text-white transition">Fast Delivery</h2>
                                        <p className="text-neutral-400">Agile workflows that turn ideas into production-ready solutions in record time.</p>
                                    </div>
                                </div>
                                <div className="rounded-tl-(--radius) relative -mb-6 -mr-6 mt-6 h-fit border-l border-t border-white/10 p-6 py-6 sm:ml-6">
                                    <div className="absolute left-3 top-2 flex gap-1">
                                        <span className="block size-2 rounded-full bg-red-500"></span>
                                        <span className="block size-2 rounded-full bg-yellow-500"></span>
                                        <span className="block size-2 rounded-full bg-green-500"></span>
                                    </div>
                                    <div className="mt-4 p-2 bg-black/50 rounded border border-white/5 font-mono text-[10px] text-emerald-500 overflow-hidden">
                                        <code>{`const build = async () => {
  await vertex.deploy({
    region: 'global',
    optimization: 'max'
  });
};`}</code>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900/50 border-white/10 backdrop-blur-sm hover:border-indigo-500/50 transition-colors">
                            <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div className="relative flex aspect-square size-12 rounded-full border border-white/10">
                                        <Users className="m-auto size-6 text-indigo-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-medium transition text-white">Expert Team</h2>
                                        <p className="text-neutral-400">Collaborative engineering culture focused on solving complex technical challenges.</p>
                                    </div>
                                </div>
                                <div className="relative mt-6 sm:-my-6 sm:-mr-6 flex items-center justify-center">
                                    <div className="flex -space-x-4 overflow-hidden p-6">
                                        {[1,2,3,4].map((i) => (
                                            <div key={i} className="inline-block h-12 w-12 rounded-full ring-2 ring-neutral-900 bg-neutral-800 flex items-center justify-center text-white font-bold">
                                                V
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
