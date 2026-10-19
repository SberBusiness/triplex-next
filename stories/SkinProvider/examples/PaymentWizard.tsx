import React, { useEffect, useRef, useState } from "react";
import { uniqueId } from "lodash-es";
import {
    QuestioncircleFilledSrvIcon16,
    SuccessStrokeStsIcon20,
    WarningStrokeStsIcon20,
} from "@sberbusiness/icons-next";
import {
    Button,
    ButtonIcon,
    Checkbox,
    EButtonTheme,
    ECellType,
    EComponentSize,
    EFontType,
    EFormFieldStatus,
    EHorizontalAlign,
    EStepperStepType,
    ETextSize,
    ETitleSize,
    ETooltipPreferPlace,
    ETooltipSize,
    ISelectFieldOption,
    ITableBasicColumn,
    Island,
    MasterTable,
    Notification,
    SelectField,
    SkinProvider,
    Stepper,
    Text,
    TextareaField,
    TextField,
    Title,
    Tooltip,
} from "@sberbusiness/triplex-next";
import styles from "./PaymentWizard.module.less";

const STAGES = ["Реквизиты", "Проверка", "Подписание", "Готово"];
const ACCOUNT_OPTIONS: ISelectFieldOption[] = [
    { id: "main", value: "main", label: "Расчётный ···· 1234" },
    { id: "reserve", value: "reserve", label: "Резервный ···· 5678" },
];
const VAT_OPTIONS: ISelectFieldOption[] = [
    { id: "vat20", value: "vat20", label: "В том числе НДС 20 %" },
    { id: "none", value: "none", label: "Без НДС" },
];
const COLUMNS: ITableBasicColumn[] = [
    { fieldKey: "document", label: "Документ" },
    { fieldKey: "recipient", label: "Получатель" },
    { fieldKey: "amount", label: "Сумма", horizontalAlign: EHorizontalAlign.RIGHT },
    { fieldKey: "status", label: "Статус", cellType: ECellType.COMPONENTS },
];
const BALANCE = 235000;
const DEMO_CODE = "123456";
const formatAmount = (value: number) =>
    new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2,
    }).format(value);

interface INotice {
    title: string;
    text: string;
    warning?: boolean;
}
const DUPLICATE_NOTICE: INotice = {
    title: "Похожий платёж уже есть",
    text: "Сверьте получателя и сумму. Возможно, этот счёт уже оплачен.",
    warning: true,
};

/** Локальная демонстрация: форма не отправляет запросы и не выполняет платежи. */
export const PaymentWizard = ({ initialStep = 0 }: { initialStep?: 0 | 1 | 2 | 3 }) => {
    const [instanceId] = useState(() => uniqueId("wordart-payment-"));
    const [step, setStep] = useState<number>(initialStep);
    const [recipient, setRecipient] = useState("ООО Лютик");
    const [account, setAccount] = useState(ACCOUNT_OPTIONS[0]);
    const [amount, setAmount] = useState("24000");
    const [vat, setVat] = useState(VAT_OPTIONS[0]);
    const [purpose, setPurpose] = useState("Оплата по договору № 12345 за партию товаров. В том числе НДС.");
    const [confirmed, setConfirmed] = useState(false);
    const [code, setCode] = useState("");
    const [detailsError, setDetailsError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const [notice, setNotice] = useState<INotice | null>(
        initialStep === 1
            ? DUPLICATE_NOTICE
            : initialStep === 3
              ? {
                    title: "Демо-платёж готов",
                    text: "Все шаги пройдены. Реальные деньги не списывались.",
                }
              : null,
    );
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const tooltipTargetRef = useRef<HTMLButtonElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const previousStepRef = useRef(step);
    const numericAmount = Number(amount.replace(/\s/g, "").replace(",", "."));
    const validAmount =
        /^\d+(?:[.,]\d{1,2})?$/.test(amount.replace(/\s/g, "")) && numericAmount >= 0.01 && numericAmount <= BALANCE;
    const displayedAmount = formatAmount(Number.isFinite(numericAmount) ? numericAmount : 0);
    const recipientError = detailsError && !recipient.trim();
    const amountError = detailsError && !validAmount;
    const purposeError = detailsError && !purpose.trim();

    useEffect(() => {
        if (previousStepRef.current !== step) {
            previousStepRef.current = step;
            headingRef.current?.focus();
        }
    }, [step]);

    useEffect(() => {
        if (detailsError || codeError) {
            formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
        }
    }, [detailsError, codeError]);

    const goToStep = (next: number) => {
        setStep(next);
        setTooltipOpen(false);
        setCode("");
        setCodeError(false);
        setDetailsError(false);
        setNotice(next === 1 ? DUPLICATE_NOTICE : null);
        if (next === 0) setConfirmed(false);
    };

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (step === 0) {
            if (!recipient.trim() || !validAmount || !purpose.trim()) {
                setDetailsError(true);
                return;
            }
            goToStep(1);
        } else if (step === 1 && confirmed) {
            goToStep(2);
        } else if (step === 2) {
            if (code !== DEMO_CODE) {
                setCodeError(true);
                return;
            }
            goToStep(3);
            setNotice({ title: "Демо-платёж готов", text: "Все шаги пройдены. Реальные деньги не списывались." });
        }
    };

    const restart = (event: React.MouseEvent<HTMLButtonElement>) => {
        // The next step reuses this DOM button as submit; cancel the current click's native default action.
        event.preventDefault();
        setRecipient("ООО Лютик");
        setAccount(ACCOUNT_OPTIONS[0]);
        setAmount("24000");
        setVat(VAT_OPTIONS[0]);
        setPurpose("Оплата по договору № 12345 за партию товаров. В том числе НДС.");
        goToStep(0);
    };

    return (
        <SkinProvider skin="wordart">
            <div className={styles.skinPaymentWizard}>
                <header className={styles.heading}>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                        TRIPLEX / WORDART BANKING
                    </Text>
                    <Title size={ETitleSize.H1}>Новый рублёвый платёж</Title>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Демонстрация · платежи не отправляются
                    </Text>
                </header>
                <Stepper
                    aria-label="Шаги платежа"
                    selectedStepId={`${instanceId}-${step}`}
                    steps={STAGES.map((label, index) => ({
                        id: `${instanceId}-${index}`,
                        label: `${index + 1}. ${label}`,
                        type: EStepperStepType.NEUTRAL,
                        disabled: index > step || step === 3,
                    }))}
                    onSelectStep={(id) => {
                        const index = STAGES.findIndex((_, itemIndex) => id === `${instanceId}-${itemIndex}`);
                        if (index >= 0 && index < step && step < 3) goToStep(index);
                    }}
                />
                <form ref={formRef} onSubmit={submit} noValidate>
                    <div className={styles.layout}>
                        <main className={styles.main}>
                            <div className={styles.sectionHeading}>
                                <Title tag="h2" size={ETitleSize.H2} ref={headingRef} tabIndex={-1}>
                                    {step === 0
                                        ? "Получатель и реквизиты"
                                        : step === 1
                                          ? "Проверьте платёж"
                                          : step === 2
                                            ? "Подтвердите операцию"
                                            : "Всё получилось!"}
                                </Title>
                                {step < 3 && (
                                    <Tooltip
                                        id={`${instanceId}-help`}
                                        role="tooltip"
                                        size={ETooltipSize.LG}
                                        targetRef={tooltipTargetRef}
                                        toggleType="click"
                                        preferPlace={ETooltipPreferPlace.BELOW}
                                        isOpen={tooltipOpen}
                                        toggle={setTooltipOpen}
                                    >
                                        <Tooltip.Target>
                                            <ButtonIcon
                                                ref={tooltipTargetRef}
                                                type="button"
                                                aria-label="Как проверяется платёж"
                                                aria-describedby={tooltipOpen ? `${instanceId}-help` : undefined}
                                            >
                                                <QuestioncircleFilledSrvIcon16 paletteIndex={5} />
                                            </ButtonIcon>
                                        </Tooltip.Target>
                                        <Tooltip.Body>
                                            В этом примере совпадение получателя и суммы показывает возможный дубликат.
                                            Перед подтверждением можно вернуться и изменить реквизиты.
                                        </Tooltip.Body>
                                        <Tooltip.MobileHeader>Проверка платежа</Tooltip.MobileHeader>
                                        <Tooltip.XButton aria-label="Закрыть подсказку" />
                                    </Tooltip>
                                )}
                            </div>
                            {step === 0 && (
                                <>
                                    <Island>
                                        <div className={styles.stack}>
                                            <Title size={ETitleSize.H3}>Получатель</Title>
                                            <TextField
                                                label="Наименование получателя"
                                                size={EComponentSize.LG}
                                                status={
                                                    recipientError ? EFormFieldStatus.ERROR : EFormFieldStatus.DEFAULT
                                                }
                                                description={
                                                    recipientError
                                                        ? "Укажите получателя"
                                                        : "Данные можно изменить или взять из шаблона справа"
                                                }
                                                inputProps={{
                                                    value: recipient,
                                                    onChange: (event) => setRecipient(event.target.value),
                                                    "aria-invalid": recipientError,
                                                }}
                                            />
                                            <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                                Счёт получателя ···· 4081 · демо-реквизиты
                                            </Text>
                                        </div>
                                    </Island>
                                    <Island>
                                        <div className={styles.stack}>
                                            <Title size={ETitleSize.H3}>Счёт и сумма</Title>
                                            <SelectField
                                                size={EComponentSize.LG}
                                                value={account}
                                                options={ACCOUNT_OPTIONS}
                                                onChange={setAccount}
                                                targetProps={{ fieldLabel: "Счёт списания" }}
                                            />
                                            <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                                Доступно {formatAmount(BALANCE)}
                                            </Text>
                                            <div className={styles.twoFields}>
                                                <TextField
                                                    label="Сумма"
                                                    size={EComponentSize.LG}
                                                    postfix="₽"
                                                    status={
                                                        amountError ? EFormFieldStatus.ERROR : EFormFieldStatus.DEFAULT
                                                    }
                                                    description={
                                                        amountError ? "Введите сумму от 0,01 до 235 000 ₽" : undefined
                                                    }
                                                    inputProps={{
                                                        value: amount,
                                                        onChange: (event) => setAmount(event.target.value),
                                                        inputMode: "decimal",
                                                        "aria-invalid": amountError,
                                                    }}
                                                />
                                                <SelectField
                                                    size={EComponentSize.LG}
                                                    value={vat}
                                                    options={VAT_OPTIONS}
                                                    onChange={setVat}
                                                    targetProps={{ fieldLabel: "НДС" }}
                                                />
                                            </div>
                                            <TextareaField
                                                label="Назначение платежа"
                                                size={EComponentSize.LG}
                                                status={
                                                    purposeError ? EFormFieldStatus.ERROR : EFormFieldStatus.DEFAULT
                                                }
                                                description={purposeError ? "Добавьте назначение платежа" : undefined}
                                                textareaProps={{
                                                    value: purpose,
                                                    onChange: (event) => setPurpose(event.target.value),
                                                    rows: 3,
                                                    "aria-invalid": purposeError,
                                                }}
                                            />
                                        </div>
                                    </Island>
                                </>
                            )}
                            {step === 1 && (
                                <>
                                    <Island>
                                        <div className={styles.stack}>
                                            <Text size={ETextSize.B2}>
                                                Найден похожий платёж. Сверьте его с новой операцией, чтобы случайно не
                                                оплатить счёт дважды.
                                            </Text>
                                            <div
                                                className={styles.tableScroll}
                                                role="region"
                                                aria-label="Похожие платежи"
                                                tabIndex={0}
                                            >
                                                <MasterTable>
                                                    <MasterTable.TableBasic
                                                        aria-label="История похожих платежей"
                                                        columns={COLUMNS}
                                                        highlightRowOnHover
                                                        data={[
                                                            {
                                                                rowKey: "duplicate",
                                                                selected: true,
                                                                rowData: {
                                                                    document: "№ 104 · 16.10.2026",
                                                                    recipient,
                                                                    amount: displayedAmount,
                                                                    status: (
                                                                        <Text
                                                                            size={ETextSize.B3}
                                                                            type={EFontType.SUCCESS}
                                                                        >
                                                                            Исполнен
                                                                        </Text>
                                                                    ),
                                                                },
                                                            },
                                                            {
                                                                rowKey: "older",
                                                                rowData: {
                                                                    document: "№ 098 · 12.10.2026",
                                                                    recipient: "ООО Василёк",
                                                                    amount: formatAmount(12500),
                                                                    status: (
                                                                        <Text
                                                                            size={ETextSize.B3}
                                                                            type={EFontType.SUCCESS}
                                                                        >
                                                                            Исполнен
                                                                        </Text>
                                                                    ),
                                                                },
                                                            },
                                                        ]}
                                                        renderNoData={() => (
                                                            <Text size={ETextSize.B3}>Похожих платежей нет</Text>
                                                        )}
                                                    />
                                                </MasterTable>
                                            </div>
                                            <Checkbox
                                                checked={confirmed}
                                                onChange={(event) => setConfirmed(event.target.checked)}
                                            >
                                                Я проверил историю. Это отдельный платёж
                                            </Checkbox>
                                        </div>
                                    </Island>
                                    <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                        Если этот счёт уже оплачен, вернитесь к реквизитам и проверьте назначение.
                                    </Text>
                                </>
                            )}
                            {step === 2 && (
                                <Island>
                                    <div className={styles.stack}>
                                        <Title size={ETitleSize.H3}>Подписание кодом</Title>
                                        <Text size={ETextSize.B2}>
                                            Подтверждение для {recipient} на сумму {displayedAmount}.
                                        </Text>
                                        <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                            Для демонстрации введите 123456. Настоящее СМС не отправляется.
                                        </Text>
                                        <TextField
                                            label="Код подтверждения"
                                            size={EComponentSize.LG}
                                            status={codeError ? EFormFieldStatus.ERROR : EFormFieldStatus.DEFAULT}
                                            description={codeError ? "Неверный демо-код. Используйте 123456" : "6 цифр"}
                                            inputProps={{
                                                value: code,
                                                onChange: (event) => {
                                                    setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                                                    setCodeError(false);
                                                },
                                                inputMode: "numeric",
                                                autoComplete: "one-time-code",
                                                maxLength: 6,
                                                "aria-invalid": codeError,
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            theme={EButtonTheme.LINK}
                                            onClick={() => {
                                                setCode("");
                                                setCodeError(false);
                                                setNotice({
                                                    title: "Код обновлён",
                                                    text: "Демо-код остаётся прежним: 123456.",
                                                });
                                            }}
                                        >
                                            Получить код ещё раз
                                        </Button>
                                    </div>
                                </Island>
                            )}
                            {step === 3 && (
                                <Island>
                                    <div className={styles.stack}>
                                        <Text size={ETextSize.B2} type={EFontType.SUCCESS}>
                                            Демо-платёж № 105 успешно подтверждён
                                        </Text>
                                        <Title size={ETitleSize.H1}>{displayedAmount}</Title>
                                        <Text size={ETextSize.B2}>{recipient}</Text>
                                        <Text size={ETextSize.B3}>{purpose}</Text>
                                        <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                            Это конец демонстрационного сценария. Можно пройти его ещё раз с другими
                                            данными.
                                        </Text>
                                    </div>
                                </Island>
                            )}
                        </main>
                        <aside className={styles.aside} aria-label="Сводка платежа">
                            <Island>
                                <div className={styles.stack}>
                                    <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                        ВАШ ПЛАТЁЖ
                                    </Text>
                                    <Title size={ETitleSize.H2}>{displayedAmount}</Title>
                                    <Text size={ETextSize.B2}>{recipient || "Получатель не указан"}</Text>
                                    <dl className={styles.summary}>
                                        <div>
                                            <dt>Со счёта</dt>
                                            <dd>{account.label}</dd>
                                        </div>
                                        <div>
                                            <dt>Налог</dt>
                                            <dd>{vat.label}</dd>
                                        </div>
                                        <div>
                                            <dt>Комиссия в демо</dt>
                                            <dd>0 ₽</dd>
                                        </div>
                                    </dl>
                                </div>
                            </Island>
                            {step === 0 && (
                                <Island>
                                    <div className={styles.stack}>
                                        <Title size={ETitleSize.H3}>Создать по шаблону</Title>
                                        {["ООО Лютик", "ООО Василёк", "ЗАО Роза"].map((name) => (
                                            <Button
                                                key={name}
                                                type="button"
                                                theme={EButtonTheme.LINK}
                                                onClick={() => {
                                                    setRecipient(name);
                                                    setAmount(name === "ООО Василёк" ? "12500" : "24000");
                                                    setNotice({
                                                        title: "Шаблон применён",
                                                        text: `Данные ${name} добавлены в форму.`,
                                                    });
                                                }}
                                            >
                                                {name}
                                            </Button>
                                        ))}
                                    </div>
                                </Island>
                            )}
                            <div className={styles.notices} aria-live="polite">
                                {notice && (
                                    <Notification aria-label={notice.title}>
                                        <Notification.Icon>
                                            {notice.warning ? (
                                                <WarningStrokeStsIcon20 paletteIndex={2} />
                                            ) : (
                                                <SuccessStrokeStsIcon20 paletteIndex={0} />
                                            )}
                                        </Notification.Icon>
                                        <Notification.Body>
                                            <Notification.Body.Header>{notice.title}</Notification.Body.Header>
                                            <Notification.Body.Content>{notice.text}</Notification.Body.Content>
                                        </Notification.Body>
                                        <Notification.Close
                                            type="button"
                                            aria-label="Закрыть уведомление"
                                            onClick={() => setNotice(null)}
                                        />
                                    </Notification>
                                )}
                            </div>
                        </aside>
                    </div>
                    <footer className={styles.footer}>
                        <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                            Шаг {step + 1} из 4 · {STAGES[step]}
                        </Text>
                        <div className={styles.actions}>
                            {step > 0 && step < 3 && (
                                <Button type="button" theme={EButtonTheme.SECONDARY} onClick={() => goToStep(step - 1)}>
                                    Назад
                                </Button>
                            )}
                            {step === 0 && (
                                <Button
                                    type="button"
                                    theme={EButtonTheme.SECONDARY}
                                    onClick={() =>
                                        setNotice({
                                            title: "Черновик готов",
                                            text: "Данные сохранены только в этой демонстрации, пока страница открыта.",
                                        })
                                    }
                                >
                                    Сохранить черновик
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button type="submit" theme={EButtonTheme.GENERAL} disabled={step === 1 && !confirmed}>
                                    {step === 0
                                        ? "Проверить платёж"
                                        : step === 1
                                          ? "Перейти к подписанию"
                                          : "Подтвердить демо-платёж"}
                                </Button>
                            ) : (
                                <Button type="button" theme={EButtonTheme.GENERAL} onClick={restart}>
                                    Новый демо-платёж
                                </Button>
                            )}
                        </div>
                    </footer>
                </form>
            </div>
        </SkinProvider>
    );
};
