import Heading from "./heading";
import Section from "./section";

export default function Page(){
    return(
        <div>
            <Section>
                <Heading level={1}>Title</Heading>
                <Section>
                    <Heading level={2}>Heading</Heading>
                    <Heading level={2}>Heading</Heading>
                    <Heading level={2}>Heading</Heading>
                    <Section>
                        <Heading level={3}>Sub-heading</Heading>
                        <Heading level={3}>Sub-heading</Heading>
                        <Heading level={3}>Sub-heading</Heading>
                        <Section>
                            <Heading level={4}>Sub-sub-heading</Heading>
                            <Heading level={4}>Sub-sub-heading</Heading>
                            <Heading level={4}>Sub-sub-heading</Heading>
                        </Section>
                    </Section>
                </Section>
            </Section>
        </div>
    )
}