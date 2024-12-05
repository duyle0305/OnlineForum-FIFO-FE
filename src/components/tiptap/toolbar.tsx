import React from 'react';
import { type Editor } from '@tiptap/react';
import { Button, Tooltip } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

interface ToolbarProps {
    editor: Editor | null;
}

const Toolbar = ({ editor }: ToolbarProps) => {
    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: '#262d34',
                borderBottom: '1px solid #30363d',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                padding: '10px',
            }}
        >
           
            {/* CODE BLOCK */}
            <Tooltip title="Code Block">

            <Button size='small' onClick={() => editor?.chain().focus().toggleCodeBlock().run()} icon={<CodeOutlined />}></Button>
            </Tooltip>
        </div>
    );
};

export default Toolbar;
