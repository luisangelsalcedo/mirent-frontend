import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { Btn } from "../../components/designSystem";
import { config } from "../../config";
import { useFetchAndLoad } from "../../hooks";
import { updateAgreementService } from "../../services";
import { agreementAdapter } from "../../adapters";
import { updateAgreementAction } from "../../redux/actions";

export const AgreementDetails = ({ id }) => {
  const editorRef = useRef(null);
  const { loading, callEndpoint } = useFetchAndLoad();

  const { agreement } = useSelector((state) => state.agreement);
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    if (editorRef.current) {
      const update = {
        details: editorRef.current.getContent(),
      };

      const result = await callEndpoint(updateAgreementService(id, update));
      const { agreement: updated } = agreementAdapter(result);

      dispatch(updateAgreementAction(updated));
    }
  };

  return (
    <div>
      <div className="content">
        <div>
          <div>
            <Editor
              apiKey={config.tinymce.key}
              onInit={(evt, editor) => {
                editorRef.current = editor;
                // console.log(editor);
              }}
              initialValue={
                agreement?.details ||
                `<h3><strong>REUNIDOS</strong></h3>\n<p>De una parte, como propietario <b>${auth.name}</b>. con DNI&hellip;&hellip;...con domicilio a efectos de notificaciones sito en&hellip;&hellip;&hellip;&hellip;.. en adelante EL PROPIETARIO.</p>\n<p>Y de otra, como inquilino&hellip;&hellip;&hellip;&hellip;.., con DNI &hellip;&hellip;.con domicilio a efectos de notificaciones sito en&hellip;&hellip;&hellip;&hellip;..., en adelante EL INQUILINO.<br>&nbsp;<br>Ambas partes act&uacute;an en su propio nombre y tienen suficiente capacidad legal para llevar a cabo este contrato. De mutuo acuerdo,</p>\n<h3>EXPONEN</h3>\n<p>1. Que EL ARRENDADOR, es propietario de la vivienda sita en&hellip;&hellip;&hellip;..</p>\n<p>2. Que EL ARRENDATARIO, est&aacute; interesado en arrendar la vivienda referenciada.</p>\n<p>Estando interesadas ambas partes llevan a cabo el presente CONTRATO DE ARRENDAMIENTO DE VIVIENDA, en base a las siguientes:</p>\n<p>CL&Aacute;USULAS</p>\n<h3>PLAZO DE DURACI&Oacute;N.</h3>\n<p>El plazo pactado de duraci&oacute;n del presente contrato de arrendamiento es de&hellip;&hellip;..., que se extender&aacute; desde la fecha&hellip;&hellip;&hellip;.a la fecha&hellip;&hellip;..</p>\n<h3>RENTA.</h3>\n<p>La renta mensual convenida es de &hellip;&hellip;....</p>\n<p>La renta pactada se podr&aacute; revisar anualmente, a partir del primer a&ntilde;o de vigencia del contrato, con arreglo al &Iacute;ndice de Precios al Consumo publicado por el Instituto Nacional de Estad&iacute;stica, o por el &iacute;ndice que decidan libremente las partes.</p>\n<h3>FIANZA</h3>\n<p>La parte arrendataria se compromete a aportar la cantidad equivalente a &hellip;&hellip;..en concepto de Fianza, con la obligaci&oacute;n de la parte arrendadora de su dep&oacute;sito legal.</p>\n<p>La fianza se restituir&aacute; a la finalizaci&oacute;n del contrato, conforme a lo establecido en la legislaci&oacute;n vigente, una vez comprobado por la arrendadora el buen estado de la vivienda y el adecuado cumplimiento de lo previsto en este contrato.</p>\n<h3>GASTOS</h3>\n<p>Los gastos de dividir&aacute;n de la siguiente forma:</p>\n<h3>SUBARRIENDO.</h3>\n<p><strong>Op. A</strong>.Se permite que el inquilino pueda subarrendar la vivienda a terceros previo aviso por escrito al propietario.</p>\n<p><strong>Op. B</strong>. Se proh&iacute;be que el inquilino pueda subarrendar la vivienda a terceros.</p>\n<h3>MASCOTAS</h3>\n<p><strong>Op. A</strong>. Se permiten mascotas dentro de la vivienda objeto del alquiler.</p>\n<p><strong>Op. B</strong>. Se proh&iacute;be que el inquilino tenga mascotas dentro de la vivienda objeto de alquiler.</p>\n<h3>FUMAR</h3>\n<p><strong>Op. A.</strong> Se permite fumar dentro de la vivienda objeto del alquiler.</p>\n<p><strong>Op. B</strong>. Se proh&iacute;be que el inquilino y los ocupantes fumen dentro de la vivienda objeto de alquiler.</p>\n<h3>CL&Aacute;USULA DE TERMINACI&Oacute;N PREMATURA</h3>\n<p><strong>Op. A</strong>. En caso de que el inquilino termine el contrato de alquiler de forma prematura deber&aacute; avisar al propietario con una antelaci&oacute;n m&iacute;nima e indemnizarle con una cantidad econ&oacute;mica.</p>\n<p><strong>Op. B</strong>. En caso de que el inquilino termine el contrato de alquiler de forma prematura no ser&aacute; necesario indemnizar al propietario con una cantidad econ&oacute;mica.</p>\n<p>Preaviso que deber&aacute; respetar el inquilino: &hellip;...</p>\n<p>Indemnizaci&oacute;n que deber&aacute; pagar el inquilino al propietario:.....</p>\n<h3>RESOLUCI&Oacute;N DE CONFLICTOS.</h3>\n<p>Para la resoluci&oacute;n de los posibles conflictos que puedan surgir en torno a la interpretaci&oacute;n del presente contrato ambas partes acuerdan someterse a los Juzgados y Tribunales de: &hellip;.</p>\n<p>Y de plena conformidad lo firman por duplicado en el lugar y fecha indicados.</p>`
              }
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic  | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>
      </div>

      <Btn
        label={loading ? "Cargando..." : "Guardar contenido"}
        btn="main"
        fa={loading ? "circle-o-notch fa-spin fa-fw" : "save"}
        onClick={handleUpdate}
        className="btn-block"
      />
    </div>
  );
};
