import {
  Divider,
  Select,
  Space,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

export default function AddAssetForm({onClouse}) {
  const [form] = Form.useForm();
  const [submited, setSubmited] = useState(false);
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const assetRef = useRef()

  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClouse}>
            Clouse
          </Button>
        ]}
      />
    );
  }

  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} is not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select Coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(values) {
    console.log("finish", values);
    const newAsset = {
        id: coin.id,
        amount: values.amount,
        price: values.price,
        date: values.date?.$d ?? new Date()
    }
    assetRef.current = newAsset
    setSubmited(true)
    addAsset(newAsset)
  }

  function handeleAmuntChandge(value) {
    const price = form.getFieldValue("price");
    form.setFieldValue("total", +(value * price).toFixed(2));
  }

  function handelePriceChandge(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldValue("total", +(amount * value).toFixed(2));
  }

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin}/>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter coin amount"
          onChange={handeleAmuntChandge}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handelePriceChandge} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime onChange={() => {}} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
