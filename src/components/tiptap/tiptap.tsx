import { useEditor, EditorContent, EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Toolbar from './toolbar';
import { OnAction } from '@/types';

const extensions = [StarterKit, Document, Paragraph, Text];

interface TiptapProps {
    onChange: OnAction;
    content: string;
}

const Tiptap = ({ onChange, content }: TiptapProps) => {
    const handleChange = (newContent: string) => {
        onChange(newContent);
    };

    const editor = useEditor({
        extensions,
        content,
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML());
        },
    });

    return (
        <div>
            <Toolbar editor={editor} />
            <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
        </div>
    );
};

export default Tiptap;
