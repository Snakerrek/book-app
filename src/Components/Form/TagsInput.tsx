import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

const TagsInputContainer = styled.div`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.superLightGrey};
  width: 100%;
  color: ${(props) => props.theme.textColors.lightGrey};
  font-size: ${(props) => props.theme.fontSize.S};
  min-height: 40px;
  padding: 0.375rem 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
  &:focus {
    outline: none;
  }
`;

const TagItem = styled.div`
  background-color: ${(props) => props.theme.backgroundColors.grey};
  display: inline-block;
  padding: 0.5em 0.75em;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span``;

const Close = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5em;
  font-size: 18px;
  cursor: pointer;
`;

const TagInput = styled.input`
  flex-grow: 1;
  padding: 0.5em 0;
  border: none;
  outline: none;
`;

type Props = {
  placeholder: string;
  name: string;
  onChange: (authors: string[]) => void;
};

const TagsInput = (props: Props) => {
  const { placeholder, name, onChange } = props;

  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== ",") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setTimeout(() => {
      e.target.value = "";
    }, 10);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((el, i) => i !== index));
    onChange(tags);
  };

  return (
    <TagsInputContainer>
      {tags.map((tag, index) => (
        <TagItem key={index}>
          <Text>{tag}</Text>
          <Close onClick={() => removeTag(index)}>
            <GrClose />
          </Close>
        </TagItem>
      ))}
      <TagInput
        onKeyDown={handleKeyDown}
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange([...tags, e.target.value])
        }
      />
    </TagsInputContainer>
  );
};

export default TagsInput;
