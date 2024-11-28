import { Flex, Image } from 'antd';
import BackgroundPlaceholder from '/public/background-placeholder.svg';

export const Medias = () => {
    return (
        <Flex gap={10} wrap justify='space-between'>
          {Array.from({ length: 6 }).map((_, index) => (
                <Image
                    key={index}
                    src={BackgroundPlaceholder}
                    alt="placeholder"
                    width={246}
                    height={160}
                    style={{ objectFit: 'cover' }}
                />
            ))}
            
        </Flex>
    );
};
