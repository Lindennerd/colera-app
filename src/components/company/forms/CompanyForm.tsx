import { Button, Form, Input } from "antd";
import { type company } from "~/server/db/schema";

type CreateCompany = typeof company.$inferInsert;

export interface CompanyFormProps {
  company?: CreateCompany;
}

export default function CompanyForm(props: CompanyFormProps) {
  const wrapperCol = { offset: 8, span: 16 };
  const initialValues = {
    id: 0,
    name: "",
  };

  return (
    <Form
      name="Nova Empresa"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={props.company ?? initialValues}
      onFinish={(values) => {
        console.log(values);
      }}
      onFinishFailed={(errorInfo) => {
        console.log(errorInfo);
      }}
    >
      <Form.Item<CreateCompany>
        label="Nome"
        name="name"
        rules={[
          {
            required: true,
            message: "É obrigatório que a empresa tenha um nome",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={wrapperCol}>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
}
