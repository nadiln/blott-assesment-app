import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import RemixIcon from "react-native-remix-icon";
import clsx from "clsx";
import Storage from "App/Utils/Storage";

type PersonalInfoFormProps = {
  navigateToScreen: () => void;
};

type PersonalInfoModel = {
  firstName: string;
  lastName: string;
};

export default function PersonalInfoForm({ navigateToScreen }: PersonalInfoFormProps) {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors: { firstName: firstNameError, lastName: lastNameError },
  } = usePersonalInfoForm({ navigateToScreen });
  return (
    <View className="flex-1 s">
      <View className="">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                className="mb-6 border-b-2 border-b-gray-200 pb-2 text-lg"
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {firstNameError && <Text className="text-red-500">First name is required.</Text>}
            </>
          )}
          name="firstName"
          rules={{ required: true }}
        />
      </View>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                className="mb-6 mt-8 border-b-2 border-b-gray-200 pb-2 text-lg"
                placeholder="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {lastNameError && <Text className="text-red-500">Last name is required.</Text>}
            </>
          )}
          name="lastName"
          rules={{ required: true }}
        />
      </View>
      <View className="absolute w-full items-end  bottom-6 justify-end">
        <View
          className={clsx(" h-12 w-12  items-center  justify-center  rounded-full bg-primary", {
            "opacity-50": firstNameError || lastNameError,
          })}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <RemixIcon name="arrow-right-s-line" color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function usePersonalInfoForm({ navigateToScreen }: PersonalInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: PersonalInfoModel) => {
    Storage.setItem("name", data.firstName + " " + data.lastName);
    navigateToScreen();
  };

  return { control, handleSubmit, onSubmit, errors };
}
