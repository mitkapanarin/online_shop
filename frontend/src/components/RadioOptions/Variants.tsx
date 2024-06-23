import { Component } from "react";
import { IAttribute } from "../../types/interface";

interface VariantsProps {
  className?: string;
  attributes: IAttribute[];
}

interface VariantsState {
  selectedOptions: { [key: string]: string };
}

export class Variants extends Component<VariantsProps, VariantsState> {
  constructor(props: VariantsProps) {
    super(props);
    this.state = {
      selectedOptions: {},
    };
  }

  handleOptionClick = (attributeName: string, value: string) => {
    this.setState((prevState) => ({
      selectedOptions: {
        ...prevState.selectedOptions,
        [attributeName]: value,
      },
    }));
  };

  render() {
    const { attributes, className } = this.props;
    const { selectedOptions } = this.state;

    if (attributes.length === 0) {
      return null;
    }

    return (
      <div className={className}>
        {attributes.map((attribute) => (
          <div key={attribute.name} className="mb-4">
            <h3 className="text-xl font-semibold">{attribute.name}</h3>
            <div className="flex gap-2 flex-wrap">
              {attribute.items.map((item) => (
                <div
                  key={item.value}
                  className={`px-2 py-1 border-2 cursor-pointer ${
                    selectedOptions[attribute.name] === item.value
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  } hover:bg-black hover:text-white`}
                  onClick={() =>
                    this.handleOptionClick(attribute.name, item.value)
                  }
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Variants;
