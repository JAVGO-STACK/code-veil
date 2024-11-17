import { BoxReveal } from "@/components/magicui/box-reveal";

export async function BoxRevealDemo() {
    return (
        <div className="size-full max-w-lg items-center justify-center overflow-hidden">
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <p className="text-[3.5rem] font-semibold">
                    Code Veil<span className="text-[#5046e6]">.</span>
                </p>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <h2 className="mt-[.5rem] text-[1rem]">
                    站长：{" "}
                    <span className="text-[#5046e6]">沉默的老李</span>
                </h2>
            </BoxReveal>

            {/*<BoxReveal boxColor={"#5046e6"} duration={0.5}>*/}
            {/*    <div className="mt-6">*/}
            {/*        <p>*/}
            {/*            <span className="font-semibold text-[#5046e6]">-&gt;</span> 这是一个专注于 Java 生态*/}
            {/*            <span className="font-semibold text-[#5046e6]"> Java 生态</span>*/}
            {/*            的技术博客，致力于揭开技术背后的逻辑与艺术，为开发者提供一些思考和灵感。*/}
            {/*            . <br/><br/>*/}
            {/*            <span className="font-semibold text-[#5046e6]">-&gt;</span> 我是一名拥有*/}
            {/*            <span className="font-semibold text-[#5046e6]">-1 年开发经验</span>*/}
            {/*            的不资深软件工程师，热衷于探索技术边界，通过代码表达对逻辑与创造的热爱。 <br/>*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</BoxReveal>*/}
        </div>
    );
}
