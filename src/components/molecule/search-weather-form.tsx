import { Form, FormInstance } from "antd";

type SearchWeatherFormProps = {
  onFinish: (values: string) => void;
  form: FormInstance;
};

const SearchWeatherForm: React.FC<SearchWeatherFormProps> = ({
  onFinish,
  form,
}) => {
  return (
    <div className="w-[40vw] mx-auto">
      <Form
        form={form}
        name="basic"
        className="flex gap-2"
        initialValues={{ city: undefined }}
        onFinish={(values) => {
          onFinish(values.city);
        }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item name="city" className="flex-grow">
          <input
            type="text"
            placeholder="Search country or city here..."
            className="border w-full  border-gray-300 text-gray-900 text-lg rounded-xl h-[50px] focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
          />
        </Form.Item>

        <Form.Item>
          <button className="text-white h-[50px] w-[110px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Search
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchWeatherForm;
