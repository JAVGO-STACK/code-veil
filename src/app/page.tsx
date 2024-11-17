import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

import { GlobeDemo } from "@/components/custom/GitHubGlobe"
import { BoxRevealDemo } from "@/components/custom/BoxRevealAnimation"
import { LinkPreviewDemo } from "@/components/custom/LinkPreviews"

export default function Home() {
  return (
    <Container>
      {/* Flex 容器，将内容和动画组件并排显示 */}
       <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* 左侧内容 */}
                <div className="flex-1">
                    <BoxRevealDemo/>
                    <LinkPreviewDemo/>
                </div>

                {/* 右侧动画组件 */}
                <div className="flex-1">
                    <GlobeDemo />
                </div>
            </div>

            {/* 其余内容 */}
            <Heading
                as="h2"
                className="font-black text-lg md:text-lg lg:text-lg mb-4"
            >
                老李的 Github 项目：
            </Heading>
            <Products />
            <TechStack />
    </Container>
  );
}
