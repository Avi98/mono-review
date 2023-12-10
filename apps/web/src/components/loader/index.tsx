import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../utils/classNameMerge";

const loader = cva("absolute ", {
  variants: {
    type: {
      oval: `after:block after:rounded-full
             after:border-top-ring after:border-left-ring 
             after:border-bottom-ring after:border-style-solid
             `,
      bars: "animate-pulse flex flex-row h-full w-full g",
      dots: "",
    },
  },

  defaultVariants: {
    type: "oval",
  },
});

const circularLoader = cva("animate-spin after:rounded-full", {
  variants: {
    size: {
      sm: "after:border-t-2 after:border-l-2 after:border-b-2 after:h-[14px] after:w-[14px]",
      md: "after:border-t-2 after:border-l-2 after:border-b-2 after:h-[24px] after:w-[24px]",
      lg: "after:border-t-2 after:border-l-2 after:border-b-2 after:h-[34px] after:w-[34px]",
      xl: "after:border-t-2 after:border-l-2 after:border-b-2 after:h-[50px] after:w-[50px]",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

const barLoader = cva("animate-pulse rounded-md", {
  variants: {
    size: {
      sm: "border-t-2 border-l-2 border-b-2 after:h-[14px] w-[14px]",
      md: "border-t-2 border-l-2 border-b-2 h-[24px] w-[24px]",
      lg: "after:border-t-2 after:border-l-2 border-b-2 h-[34px] w-[34px]",
      xl: "border-t-2 border-l-2 border-b-2 h-[50px] w-[50px]",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

const dotsLoader = cva("animate-pulse ", {
  variants: {
    size: {
      sm: "border-t-2 border-l-2 border-b-2 after:h-[14px] w-[14px]",
      md: "h-[20px] w-[20px] bg-ring",
      lg: "after:border-t-2 after:border-l-2 border-b-2 h-[34px] w-[34px]",
      xl: "border-t-2 border-l-2 border-b-2 h-[50px] w-[50px]",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

type LoaderPropType = VariantProps<typeof loader> &
  VariantProps<typeof circularLoader>;

export const Loader = (props: LoaderPropType) => {
  return (
    <div className="relative grid w-full place-items-center ">
      <span
        className={cn(
          loader({ type: props.type }),
          circularLoader({ size: props.size })
        )}
      >
        {/* @TODO create other variants of spinner also */}
        <span className="h-full w-full"></span>
        <span className="h-full w-full"></span>
        <span className="h-full w-full"></span>
      </span>
    </div>
  );
};
