'use client'

import { PluginCard } from '../PluginCard';

export const PluginGrid = ({ plugins }: { plugins: WordPressPlugin[] }) => {
  return (
    <div className="px-[20px] md:px-[80px] mt-[20px]">
      <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-6">
        {plugins.map((plugin) => (
          <PluginCard plugin={plugin} key={plugin.slug} />
        ))}
      </div>
    </div>
  );
}