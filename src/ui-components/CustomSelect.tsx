import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import React, { ForwardedRef } from "react";

export interface ItemsProps {
  title: string;
  items: {
    value: string;
    child: string;
  }[];
}

export const CustomSelect = ({
  operation,
  placeholder,
  items,
  color,
}: {
  operation: (text: string) => void;
  placeholder: string;
  items: ItemsProps[];
  color: string;
}) => {
  const handleValueChange = (newValue: string) => {
    operation(newValue);
  };

  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger
        className={`inline-flex items-center justify-center rounded px-[15px] text-[17px] leading-none h-[35px] gap-[5px] bg-accent text-secondary shadow-[0_2px_10px] shadow-black/10 hover:bg-hovers focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-secondary outline-none`}
        aria-label="Food"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-secondary">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton
            className={`flex items-center justify-center h-[25px] bg-white text-${color} cursor-default`}
          >
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group className="flex flex-col items-center justify-center">
              {items.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                    {item.title}
                  </Select.Label>

                  {item.items.map((el) => (
                    <SelectItem key={el.value} value={el.value}>
                      {el.child}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={classnames(
          "text-[13px] leading-none text-accent rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-accent data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
        value={props.value}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default CustomSelect;
